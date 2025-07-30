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
    <div>
      <div className="flex flex-col justify-center items-center space-y-6">
        <div className="w-full max-w-xl space-y-6 px-20 py-14 bg-white rounded-lg shadow-md">
          <div>
            <h2 className="mt-6 text-4xl font-semibold text-gray-900">
              로그인
            </h2>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              {/* <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-900 mb-1"
                >
                  아이디
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-200 sm:text-sm"
                  placeholder="아이디를 입력하세요"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div> */}
              <FormInput
                name="loginId"
                label="아이디"
                type="text"
                value={formData.loginId}
                onChange={handleChange}
                disabled={loading}
                placeholder="아이디를 입력하세요"
              ></FormInput>

              {/* <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900 mb-1"
                >
                  비밀번호
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-200 sm:text-sm"
                  placeholder="비밀번호를 입력하세요"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div> */}

              <FormInput
                name="password"
                label="비밀번호"
                type="password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                placeholder="비밀번호를 입력하세요"
              ></FormInput>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-amber-200 focus:ring-amber-200 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  아이디 저장
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="bg-primary group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-primary-hover"
              >
                {loading ? "로그인 중..." : "로그인"}
              </button>
            </div>
          </form>

          <div className="text-center text-sm space-y-2 mt-4">
            <div className="space-x-4">
              <a href="/find-id" className="text-primary hover:underline">
                아이디 찾기
              </a>
              <a href="/find-password" className="text-primary hover:underline">
                비밀번호 찾기
              </a>
            </div>
            <div className="text-gray-700">
              아직 계정이 없으신가요?{" "}
              <button
                onClick={() => router.push("/register")}
                className="text-primary font-bold hover:underline"
              >
                회원가입
              </button>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-4">
            <p className="text-xs text-center text-gray-500">
              가입 및 결제 관련 문의:{" "}
              <span className="font-semibold">1670-5800</span> (평일
              09:00-18:00)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
