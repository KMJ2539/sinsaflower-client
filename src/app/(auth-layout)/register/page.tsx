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
    setTermsAgreed((prev) => ({
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
    setShowTermsDetail((prev) => ({
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
    <div>
      {/* 가입 단계 */}
      <div className="flex mb-8 justify-center">
        <div className="flex items-center">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              currentStep >= 1 ? "bg-amber-200 " : "bg-gray-200 text-gray-500"
            }`}
          >
            1
          </div>
          <div className="text-sm ml-2 w-14">약관동의</div>
        </div>
        <div className="w-16 h-1 mx-2 bg-gray-200 self-center"></div>
        <div className="flex items-center">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              currentStep >= 2 ? "bg-amber-200" : "bg-gray-200 text-gray-500"
            }`}
          >
            2
          </div>
          <div className="text-sm ml-2 w-14">정보입력</div>
        </div>
        <div className="w-16 h-1 mx-2 bg-gray-200 self-center"></div>
        <div className="flex items-center">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              currentStep >= 3
                ? "bg-amber-200 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            3
          </div>
          <div className="text-sm ml-2 w-14">가입완료</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md px-8 md:px-20 py-14">
        {/* Step 1: 약관동의 */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">이용약관 동의</h2>

            <div className="mb-6">
              <div className="border rounded-md p-4 mb-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={allChecked}
                      onChange={(e) => handleAllChange(e.target.checked)}
                    />
                    전체 약관에 동의합니다.
                  </label>
                </div>
                <div className="border-t pt-2 pl-6 text-sm text-gray-600">
                  선택 항목에 동의하지 않으셔도 서비스 이용이 가능합니다.
                </div>
              </div>

              {/* 이용약관 */}
              <div className="pt-2 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm flex items-center">
                    <input
                      type="checkbox"
                      checked={termsAgreed.terms1}
                      onChange={(e) =>
                        handleTermsChange("terms1", e.target.checked)
                      }
                    />
                    <div>
                      <abbr className="mr-3" />
                    </div>
                    서비스 이용약관 동의 (필수)
                  </label>
                  <button
                    type="button"
                    className="text-sm text-gray-500 hover:underline"
                    onClick={() => toggleTermsDetail("terms1")}
                  >
                    자세히
                  </button>
                </div>
                {showTermsDetail.terms1 && (
                  <div className="bg-gray-50 p-4 border rounded-md h-32 overflow-y-auto text-sm text-gray-600">
                    <p className="mb-2 font-semibold">제1장 총칙</p>
                    <p>제1조 (목적)</p>
                    <p>
                      이 약관은 신사 플라워(이하 "회사"라 함)가 제공하는
                      서비스(이하 "서비스"라 함)의 이용과 관련하여 회사와 이용자
                      간의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.
                    </p>
                    <p>제2조 (약관의 효력 및 변경)</p>
                    <p>
                      ① 이 약관은 서비스를 통하여 이를 공지하거나 전자우편,
                      기타의 방법으로 이용자에게 통지함으로써 효력이 발생합니다.
                    </p>
                  </div>
                )}
              </div>

              {/* 개인정보 수집 이용 */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm flex items-center">
                    <input
                      type="checkbox"
                      checked={termsAgreed.terms2}
                      onChange={(e) =>
                        handleTermsChange("terms2", e.target.checked)
                      }
                    />
                    <div>
                      <abbr className="mr-3" />
                    </div>
                    개인정보 수집 및 이용 동의 (필수)
                  </label>
                  <button
                    type="button"
                    className="text-sm text-gray-500 hover:underline"
                    onClick={() => toggleTermsDetail("terms2")}
                  >
                    자세히
                  </button>
                </div>
                {showTermsDetail.terms2 && (
                  <div className="bg-gray-50 p-4 border rounded-md h-32 overflow-y-auto text-sm text-gray-600">
                    <p className="mb-2 font-semibold">
                      개인정보 수집 및 이용 안내
                    </p>
                    <p>
                      ① 수집하는 개인정보 항목: 아이디, 이름(상호명), 비밀번호,
                      연락처, 주소, 사업자등록번호, 계좌정보
                    </p>
                    <p>
                      ② 수집 및 이용 목적: 회원제 서비스 제공, 서비스 이용 및
                      상담, 거래 관리
                    </p>
                    <p>
                      ③ 보유 및 이용기간: 회원 탈퇴 시까지 (단, 관계 법령에 따라
                      필요한 경우 해당 법령에서 정한 기간 동안 보존)
                    </p>
                  </div>
                )}
              </div>

              {/* 마케팅 정보 수신 동의 */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm flex items-center">
                    <input
                      type="checkbox"
                      checked={termsAgreed.terms3}
                      onChange={(e) =>
                        handleTermsChange("terms3", e.target.checked)
                      }
                    />
                    마케팅 정보 수신 동의 (선택)
                  </label>
                  <button
                    type="button"
                    className="text-sm text-gray-500 hover:underline"
                    onClick={() => toggleTermsDetail("terms3")}
                  >
                    자세히
                  </button>
                </div>
                {showTermsDetail.terms3 && (
                  <div className="bg-gray-50 p-4 border rounded-md h-32 overflow-y-auto text-sm text-gray-600">
                    <p className="mb-2 font-semibold">마케팅 정보 수신 안내</p>
                    <p>① 수집 항목: 휴대전화번호, 이메일</p>
                    <p>
                      ② 이용 목적: 신규 서비스 안내, 이벤트 및 혜택 정보 제공
                    </p>
                    <p>
                      ③ 보유 및 이용기간: 회원 탈퇴 시 또는 동의 철회 시까지
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                className="px-6 py-2 rounded-md font-medium text-white bg-primary"
                onClick={nextStep}
              >
                다음
              </button>
            </div>
          </div>
        )}

        {/* Step 2: 정보입력 */}
        {currentStep === 2 && (
          <RegisterForm
            prevStep={() => setCurrentStep(1)}
            nextStep={() => setCurrentStep(3)}
          />
        )}

        {/* Step 3: 가입완료 */}
        {currentStep === 3 && <RegisterSuccess />}
      </div>
    </div>
  );
}
