import Link from "next/link";

const RegisterSuccess = () => {
  return (
    <div className="text-center py-12">
      <div className="mb-8">
        <div className="w-24 h-24 mx-auto bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-lg mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
          회원가입이 완료되었습니다!
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
          신사 플라워의 회원이 되신 것을 환영합니다.
          <br />
          <span className="font-medium text-primary">
            관리자 승인 후 로그인이 가능합니다.
          </span>
        </p>
      </div>

      <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-2xl p-6 mb-8 max-w-md mx-auto">
        <h3 className="font-semibold text-gray-800 mb-3">다음 단계</h3>
        <div className="text-sm text-gray-600 space-y-2">
          <div className="flex items-center justify-center">
            <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
            <span>관리자가 회원 정보를 검토합니다</span>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
            <span>승인 완료 시 이메일로 알림을 받습니다</span>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
            <span>로그인하여 서비스를 이용하세요</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Link
          href="/login"
          className="px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02]"
        >
          로그인하기
        </Link>
      </div>
    </div>
  );
};

export default RegisterSuccess;
