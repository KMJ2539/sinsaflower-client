import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:80";

/**
 * 클라이언트 전용 axios 인스턴스
 * - 쿠키 전송: withCredentials: true
 * - 필요 시 localStorage 토큰을 Authorization 헤더로 추가(기존 호환)
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // httpOnly 쿠키 사용하는 백엔드와 호환
});

// 요청 인터셉터 - localStorage 토큰을 Authorization에 첨부(선택적)
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 클라이언트 사이드에서만 localStorage 접근
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        // axios v1 헤더 세터 사용
        config.headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 401이면 refresh 시도 후, 원 요청 1회 재시도 (auth/refresh 요청하는걸로 수정필요.)
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // 클라이언트 사이드에서만 로그아웃 처리
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// apiClient.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error: AxiosError) => {
//     const status = error.response?.status;
//     const original = error.config as
//       | (AxiosRequestConfig & { _retry?: boolean })
//       | undefined;

//     if (status === 401 && original && !original._retry) {
//       original._retry = true;
//       try {
//         // refresh: httpOnly 쿠키 기반이면 body 없이도 가능
//         // 토큰을 body로 주는 서버라면 응답에서 accessToken을 꺼내 저장하세요.
//         const refreshRes = await axios.post(
//           `${API_BASE_URL}/auth/refresh`,
//           null,
//           { withCredentials: true }
//         );

//         // 만약 서버가 새 액세스 토큰을 응답 바디로 준다면 아래 주석 해제
//         // const newToken = (refreshRes.data as any)?.accessToken;
//         // if (newToken && typeof window !== "undefined") {
//         //   localStorage.setItem("token", newToken);
//         // }

//         // 원 요청 재시도
//         return apiClient.request(original);
//       } catch {
//         if (typeof window !== "undefined") {
//           localStorage.removeItem("token");
//           localStorage.removeItem("user");
//           window.location.href = "/login";
//         }
//       }
//     }

//     return Promise.reject(error);
//   }
// );

/**
 * 서비스 레이어에서 axios를 직접 쓰지 않고 이 함수만 사용
 * 반환 타입 항상 res.data로 통일
 * data: 요청바디(POST/PUT/PATCH), params:요청 쿼리스트링(GET)
 */
export async function clientRequest<T = unknown>(
  config: AxiosRequestConfig
): Promise<T> {
  const res = await apiClient.request<T>(config);
  return res.data as T;
}

// 필요 시 로그인/로그아웃 시점에서 토큰 저장/제거에 사용
export function setAuthToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem("token", token);
  else localStorage.removeItem("token");
}
