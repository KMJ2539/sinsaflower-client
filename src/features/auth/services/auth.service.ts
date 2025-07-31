import { User } from "@/shared/types/user";
import apiClient from "@/shared/lib/axios";

// 클라이언트 전용 함수들
// 로그인
export async function login(loginId: string, password: string) {
  console.log("AuthService: 로그인 요청", { loginId });
  const response = await apiClient.post("/api/auth/login", {
    loginId,
    password,
  });
  console.log("AuthService: 로그인 응답", response.data);
  return response.data;
}

// 회원가입
export async function signup(inputs: RegisterFormInputs) {
  const formData = new FormData();
  console.log(inputs, inputs);

  const { bankCertFile, businessCertFile, ...restInputs } = inputs;

  formData.append(
    "request",
    new Blob([JSON.stringify(restInputs)], { type: "application/json" })
  );
  formData.append("bankCertFile", inputs.bankCertFile);
  formData.append("businessCertFile", inputs.businessCertFile);

  console.log("AuthService: 회원가입 요청", formData);

  const response = await apiClient.post("/api/auth/signup", formData, {
    headers: {},
  });

  console.log("AuthService: 회원가입 응답", response.data);
  return response.data;
}

// 아이디 중복 확인
export async function checkUserId(userId: string) {
  console.log("AuthService: 아이디 중복 확인 요청", { userId });
  const response = await apiClient.get(
    `/api/auth/check-userid?userId=${userId}`
  );
  console.log("AuthService: 아이디 중복 확인 응답", response.data);
  return response.data;
}

// 관리자 - 대기중인 사용자 목록 조회
export async function getPendingUsers() {
  console.log("AuthService: 대기중인 사용자 목록 조회");
  const response = await apiClient.get("/api/auth/admin/pending-users");
  console.log("AuthService: 대기중인 사용자 목록 응답", response.data);
  return response.data;
}

// 관리자 - 사용자 승인
export async function approveUser(userId: string) {
  console.log("AuthService: 사용자 승인 요청", { userId });
  const response = await apiClient.post(`/api/auth/admin/approve/${userId}`);
  console.log("AuthService: 사용자 승인 응답", response.data);
  return response.data;
}

// 관리자 - 사용자 거부
export async function rejectUser(userId: string, reason: string) {
  console.log("AuthService: 사용자 거부 요청", { userId, reason });
  const response = await apiClient.post(
    `/api/auth/admin/reject/${userId}`,
    null,
    {
      params: { reason },
    }
  );
  console.log("AuthService: 사용자 거부 응답", response.data);
  return response.data;
}
