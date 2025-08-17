"use client";

import React, { useState } from "react";
import RegisterForm from "@/features/auth/components/RegisterForm";
import RegisterSuccess from "@/features/auth/components/RegisterSuccess";

//마케팅동의, 약관동의, Step(Hook) 분리해야함
export default function Page() {
  const [currentStep, setCurrentStep] = useState(1);
  const [termsAgreed, setTermsAgreed] = useState({
    terms1: false,
    terms2: false,
    terms3: false,
  });
  const [showTermsDetail, setShowTermsDetail] = useState({
    terms1: false,
    terms2: false,
    terms3: false,
  });

  type TermTypeVariant = "terms1" | "terms2" | "terms3";

  const allChecked =
    termsAgreed.terms1 && termsAgreed.terms2 && termsAgreed.terms3;

  /* 개별 약관 수정 이벤트  */
  const handleTermsChange = (
    termType: keyof typeof termsAgreed,
    value: boolean
  ) => {
    setTermsAgreed((prev: any) => ({
      ...prev,
      [termType]: value,
    }));
  };

  /* 전체 약관 클릭 이벤트 */
  const handleAllChange = (value: boolean) => {
    setTermsAgreed({
      terms1: value,
      terms2: value,
      terms3: value,
    });
  };

  const toggleTermsDetail = (termType: TermTypeVariant) => {
    setShowTermsDetail((prev: any) => ({
      ...prev,
      [termType]: !prev[termType],
    }));
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!termsAgreed.terms1 || !termsAgreed.terms2) {
        alert("필수 약관에 동의해주세요.");
        return;
      }
      setCurrentStep(2);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 가입 단계 */}
      <div className="flex mb-12 justify-center">
        <div className="flex items-center">
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-semibold transition-all duration-300 ${
              currentStep >= 1
                ? "bg-amber-200 text-gray-800 shadow-lg"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            1
          </div>
          <div className="text-sm ml-3 w-16 font-medium">약관동의</div>
        </div>
        <div
          className={`w-20 h-1 mx-4 self-center transition-all duration-300 ${
            currentStep >= 2 ? "bg-amber-200" : "bg-gray-200"
          }`}
        ></div>
        <div className="flex items-center">
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-semibold transition-all duration-300 ${
              currentStep >= 2
                ? "bg-amber-200 text-gray-800 shadow-lg"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            2
          </div>
          <div className="text-sm ml-3 w-16 font-medium">정보입력</div>
        </div>
        <div
          className={`w-20 h-1 mx-4 self-center transition-all duration-300 ${
            currentStep >= 3 ? "bg-amber-200" : "bg-gray-200"
          }`}
        ></div>
        <div className="flex items-center">
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-semibold transition-all duration-300 ${
              currentStep >= 3
                ? "bg-amber-200 text-gray-800 shadow-lg"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            3
          </div>
          <div className="text-sm ml-3 w-16 font-medium">가입완료</div>
        </div>
      </div>

      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
        {/* Step 1: 약관동의 */}
        {currentStep === 1 && (
          <div className="px-10 py-10">
            <div className="mb-10">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                이용약관 동의
              </h2>
              {/* <p className="text-sm text-gray-500">
                서비스 이용을 위한 약관에 동의해주세요
              </p> */}
            </div>

            <div className="mb-8">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={allChecked}
                      onChange={(e) => handleAllChange(e.target.checked)}
                      className="h-6 w-6"
                    />
                    <span className="ml-4 text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors duration-200">
                      전체 약관에 동의합니다.
                    </span>
                  </label>
                </div>
                <div className="pl-10 text-sm text-gray-500 bg-gray-50 rounded-xl p-3">
                  선택 항목에 동의하지 않으셔도 서비스 이용이 가능합니다.
                </div>
              </div>

              {/* 이용약관 */}
              <div className="mb-6">
                <div className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/30">
                  <div className="flex items-center justify-between mb-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={termsAgreed.terms1}
                        onChange={(e) =>
                          handleTermsChange("terms1", e.target.checked)
                        }
                        className="h-5 w-5"
                      />
                      <span className="ml-4 font-semibold text-gray-800 group-hover:text-primary transition-colors duration-200">
                        서비스 이용약관 동의{" "}
                        <span className="text-sm">(필수)</span>
                      </span>
                    </label>
                    <button
                      type="button"
                      className="px-3 py-2 text-sm text-primary hover:text-primary-hover font-medium transition-all duration-200 rounded-lg hover:bg-primary/5"
                      onClick={() => toggleTermsDetail("terms1")}
                    >
                      {showTermsDetail.terms1 ? "접기" : "자세히 보기"}
                    </button>
                  </div>
                  {showTermsDetail.terms1 && (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 h-48 overflow-y-auto text-sm text-gray-700 mb-4">
                      <div className="space-y-4">
                        <p className="font-semibold text-gray-800 text-base mb-3">
                          제1장 총칙
                        </p>
                        <div className="space-y-3">
                          <p className="font-semibold text-gray-800">
                            제1조 (목적)
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            이 약관은 신사 플라워(이하 "회사"라 함)가 제공하는
                            서비스(이하 "서비스"라 함)의 이용과 관련하여 회사와
                            이용자 간의 권리, 의무 및 책임사항 등을 규정함을
                            목적으로 합니다.
                          </p>
                          <p className="font-semibold text-gray-800">
                            제2조 (약관의 효력 및 변경)
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            ① 이 약관은 서비스를 통하여 이를 공지하거나
                            전자우편, 기타의 방법으로 이용자에게 통지함으로써
                            효력이 발생합니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 개인정보 수집 이용 */}
              <div className="mb-6">
                <div className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/30">
                  <div className="flex items-center justify-between mb-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={termsAgreed.terms2}
                        onChange={(e) =>
                          handleTermsChange("terms2", e.target.checked)
                        }
                        className="h-5 w-5"
                      />
                      <span className="ml-4 font-semibold text-gray-800 group-hover:text-primary transition-colors duration-200">
                        개인정보 수집 및 이용 동의{" "}
                        <span className="text-sm">(필수)</span>
                      </span>
                    </label>
                    <button
                      type="button"
                      className="px-3 py-2 text-sm text-primary hover:text-primary-hover font-medium transition-all duration-200 rounded-lg hover:bg-primary/5"
                      onClick={() => toggleTermsDetail("terms2")}
                    >
                      {showTermsDetail.terms2 ? "접기" : "자세히 보기"}
                    </button>
                  </div>
                  {showTermsDetail.terms2 && (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 h-48 overflow-y-auto text-sm text-gray-700 mb-4">
                      <div className="space-y-4">
                        <p className="font-semibold text-gray-800 text-base mb-3">
                          개인정보 수집 및 이용 안내
                        </p>
                        <div className="space-y-3">
                          <p className="font-semibold text-gray-800">
                            ① 수집하는 개인정보 항목
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            아이디, 이름(상호명), 비밀번호, 연락처, 주소,
                            사업자등록번호, 계좌정보
                          </p>
                          <p className="font-semibold text-gray-800">
                            ② 수집 및 이용 목적
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            회원제 서비스 제공, 서비스 이용 및 상담, 거래 관리
                          </p>
                          <p className="font-semibold text-gray-800">
                            ③ 보유 및 이용기간
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            회원 탈퇴 시까지 (단, 관계 법령에 따라 필요한 경우
                            해당 법령에서 정한 기간 동안 보존)
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 마케팅 정보 수신 동의 */}
              <div className="mb-6">
                <div className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/30">
                  <div className="flex items-center justify-between mb-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={termsAgreed.terms3}
                        onChange={(e) =>
                          handleTermsChange("terms3", e.target.checked)
                        }
                        className="h-5 w-5"
                      />
                      <span className="ml-4 font-semibold text-gray-800 group-hover:text-primary transition-colors duration-200">
                        마케팅 정보 수신 동의{" "}
                        <span className="text-sm">(선택)</span>
                      </span>
                    </label>
                    <button
                      type="button"
                      className="px-3 py-2 text-sm text-primary hover:text-primary-hover font-medium transition-all duration-200 rounded-lg hover:bg-primary/5"
                      onClick={() => toggleTermsDetail("terms3")}
                    >
                      {showTermsDetail.terms3 ? "접기" : "자세히 보기"}
                    </button>
                  </div>
                  {showTermsDetail.terms3 && (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 h-48 overflow-y-auto text-sm text-gray-700 mb-4">
                      <div className="space-y-4">
                        <p className="font-semibold text-gray-800 text-base mb-3">
                          마케팅 정보 수신 안내
                        </p>
                        <div className="space-y-3">
                          <p className="font-semibold text-gray-800">
                            ① 수집 항목
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            휴대전화번호, 이메일
                          </p>
                          <p className="font-semibold text-gray-800">
                            ② 이용 목적
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            신규 서비스 안내, 이벤트 및 혜택 정보 제공
                          </p>
                          <p className="font-semibold text-gray-800">
                            ③ 보유 및 이용기간
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            회원 탈퇴 시 또는 동의 철회 시까지
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                className="sf-btn sf-btn--primary sf-btn--xl"
                onClick={nextStep}
              >
                다음 단계로
              </button>
            </div>
          </div>
        )}

        {/* Step 2: 정보입력 */}
        {currentStep === 2 && (
          <div className="px-10 py-10">
            <RegisterForm
              prevStep={() => setCurrentStep(1)}
              nextStep={() => setCurrentStep(3)}
            />
          </div>
        )}

        {/* Step 3: 가입완료 */}
        {currentStep === 3 && (
          <div className="px-10 py-10">
            <RegisterSuccess />
          </div>
        )}
      </div>
    </div>
  );
}
