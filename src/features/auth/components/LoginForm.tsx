"use client";

import FormInput from "@/shared/components/ui/FormInput";
import { useAuth } from "@/shared/context/auth.context";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // AuthContext의 login 함수 사용 (admin 계정도 포함)
      const result = await login(formData.loginId, formData.password);
      console.log(result);
      if (result.success) {
        console.log("로그인 성공:", result.user);

        // 역할에 따라 리다이렉트
        if (result.user.role === "ADMIN") {
          router.push("/admin-dashboard");
        } else {
          router.push("/"); // 일반 사용자 대시보드
        }
      } else {
        console.log(result);
        setError(result.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 처리 중 오류:", error);
      setError("로그인 처리 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* 로그인 폼 카드 */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
        <div className="px-10 py-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
              로그인
            </h2>
            {/* <p className="text-sm text-gray-500">
              계정에 로그인하여 서비스를 이용하세요
            </p> */}
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-danger p-4 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-danger"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="space-y-5">
              <FormInput
                name="loginId"
                label="아이디"
                type="text"
                value={formData.loginId}
                onChange={handleChange}
                disabled={loading}
                placeholder="아이디를 입력하세요"
              />

              <FormInput
                name="password"
                label="비밀번호"
                type="password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                placeholder="비밀번호를 입력하세요"
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-3 block text-sm text-gray-600"
              >
                아이디 저장
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:from-primary-hover hover:to-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  로그인 중...
                </div>
              ) : (
                "로그인"
              )}
            </button>
          </form>

          {/* 추가 링크들 */}
          <div className="mt-8 pt-4 border-t border-gray-100">
            <div className="flex justify-center space-x-8 mb-4">
              <a
                href="/find-id"
                className="text-sm text-gray-500 hover:text-primary transition-colors duration-200 font-medium"
              >
                아이디 찾기
              </a>
              <span className="text-gray-200">|</span>
              <a
                href="/find-password"
                className="text-sm text-gray-500 hover:text-primary transition-colors duration-200 font-medium"
              >
                비밀번호 찾기
              </a>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">
                아직 계정이 없으신가요?
              </p>
              <button
                onClick={() => router.push("/register")}
                className="text-primary font-semibold hover:text-primary-hover transition-colors duration-200 text-base"
              >
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 연락처 정보 */}
      <div className="mt-8 text-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/20">
          <p className="text-xs text-gray-600">
            가입 및 결제 관련 문의: <span className="font-bold">1670-5800</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">평일 09:00-18:00</p>
        </div>
      </div>

      {/* 관리자 테스트 진입 버튼 */}
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => router.push("/admin-dashboard")}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-800 text-white text-sm font-semibold shadow hover:bg-gray-700 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M11.7 2.005a1 1 0 0 1 .6 0l8 3A1 1 0 0 1 21 6v6a9 9 0 1 1-18 0V6a1 1 0 0 1 .7-.995l8-3Z"/>
          </svg>
          관리자 테스트: 대시보드로 이동
        </button>
        <p className="mt-2 text-xs text-gray-500">테스트용 – 로그인 없이 관리자 대시보드 확인</p>
      </div>
    </div>
  );
};

export default LoginForm;
