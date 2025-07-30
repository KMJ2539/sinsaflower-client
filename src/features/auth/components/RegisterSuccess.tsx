import Link from "next/link";

const RegisterSuccess = () => {
  return (
    <div className="text-center py-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-20 w-20 mx-auto text-green-500 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h2 className="text-2xl font-bold mb-4">회원가입이 완료되었습니다!</h2>
      <p className="text-gray-600 mb-8">
        신사 플라워의 회원이 되신 것을 환영합니다.
        <br />
        관리자 승인 후 로그인이 가능합니다.
      </p>
      <div className="flex justify-center">
        <Link
          href="/login"
          className="px-6 py-2 rounded-md font-medium text-white bg-primary"
        >
          로그인하기
        </Link>
      </div>
    </div>
  );
};

export default RegisterSuccess;
