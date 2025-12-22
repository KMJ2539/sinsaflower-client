"use client";

import { useState, useRef, useEffect } from "react";
import DeliveryRegionPopup from "@/shared/components/DeliveryRegionPopup";

const EditUserForm = () => {
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!open) return;
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form id="profile-edit-form">
        <table className="sf-table sf-table--form">
          <tbody>
            {/* 아이디 */}
            <tr>
              <th>아이디</th>
              <td colSpan={3}>
                <p>
                  <input
                    name="userid"
                    type="text"
                    value="vip4040"
                    readOnly
                    className="border border-gray-300 rounded p-0.5 bg-gray-100 text-xs"
                  />
                </p>
              </td>
            </tr>

            {/* 비밀번호 */}
            <tr>
              <th>비밀번호</th>
              <td>
                <p>
                  <input
                    name="password"
                    type="password"
                    className="border border-gray-300 rounded p-0.5 text-xs w-full"
                  />
                </p>
                <p className="text-blue-500 mt-0.5">
                  비밀번호는 입력하지 않으면 변경되지 않습니다.
                </p>
              </td>

              <th>비밀번호 확인</th>
              <td>
                <p>
                  <input
                    name="password_confirmation"
                    type="password"
                    className="border border-gray-300 rounded p-0.5 text-xs w-full"
                  />
                </p>
              </td>
            </tr>

            {/* 화원명 */}
            <tr>
              <th>
                화원명<span className="sf-req">*</span>
              </th>
              <td>
                <p>
                  <input
                    name="office_name"
                    type="text"
                    value="화환앤플라워"
                    className="border border-gray-300 rounded p-0.5 text-xs w-full"
                  />
                </p>
              </td>

              <th>
                대표자명<span className="sf-req">*</span>
              </th>
              <td>
                <p>
                  <input
                    name="name"
                    type="text"
                    value="노광택"
                    className="border border-gray-300 rounded p-0.5 text-xs w-full"
                  />
                </p>
              </td>
            </tr>

            {/* 게시판 닉네임 */}
            <tr>
              <th>
                게시판 닉네임<span className="sf-req">*</span>
              </th>
              <td colSpan={3}>
                <p>
                  <input
                    name="nick_name"
                    type="text"
                    value="춘천화환앤플라워"
                    className="border border-gray-300 rounded p-0.5 text-xs w-full"
                  />
                </p>
              </td>
            </tr>

            {/* 기본배송지 */}
            <tr>
              <th>기본배송지</th>
              <td colSpan={3}>
                <p>
                  <input
                    name="short_address"
                    type="text"
                    value="강원도 춘천시"
                    readOnly
                    className="border border-gray-300 rounded p-0.5 text-xs w-[280px] bg-gray-100"
                  />
                </p>
              </td>
            </tr>

            {/* 배송지역정보 */}
            <tr>
              <th>배송지역정보</th>
              <td>
                <div>
                  <div className="relative inline-block" id="delivery-region-wrapper" ref={wrapperRef}>
                    <p>
                      <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="sf-btn-img--lg"
                      >
                        배송지역 수정
                      </button>
                    </p>
                    {open && (
                      <DeliveryRegionPopup
                        onClose={() => setOpen(false)}
                      />
                    )}
                  </div>
                </div>
              </td>
            </tr>

            {/* 화원 실제주소 */}
            <tr>
              <th>
                화원 실제주소<span className="sf-req">*</span>
              </th>
              <td colSpan={3}>
                <p className="flex items-center space-x-1">
                  <input
                    name="zipcode"
                    type="text"
                    value="24210"
                    className="border border-gray-300 rounded p-0.5 text-xs w-[70px]"
                  />
                  <button type="button" className="sf-btn-img--md">
                    주소검색
                  </button>
                </p>
                <p className="mt-0.5">
                  <input
                    name="address"
                    type="text"
                    value="강원 춘천시 동면 장학리 260-2   1층"
                    className="border border-gray-300 rounded p-0.5 text-xs w-full"
                  />
                </p>
              </td>
            </tr>

            {/* 대표전화 */}
            <tr>
              <th>
                대표전화<span className="sf-req">*</span>
              </th>
              <td>
                <p>
                  <input
                    name="tel"
                    type="text"
                    value="010-5174-0942"
                    className="border border-gray-300 rounded p-0.5 text-xs w-full"
                  />
                </p>
              </td>

              <th>
                팩스번호<span className="sf-req">*</span>
              </th>
              <td>
                <p>
                  <input
                    name="fax"
                    type="text"
                    value="033-254-9471"
                    className="border border-gray-300 rounded p-0.5 text-xs w-full"
                  />
                </p>
              </td>
            </tr>

            {/* 대표휴대폰 */}
            <tr>
              <th>
                대표휴대폰<span className="sf-req">*</span>
              </th>
              <td>
                <p>
                  <input
                    name="phone1"
                    type="text"
                    value="010-5174-0942"
                    className="border border-gray-300 rounded p-0.5 text-xs w-full"
                  />
                </p>
              </td>
            </tr>

            {/* 계좌번호 */}
            <tr>
              <th>
                계좌번호<span className="sf-req">*</span>
              </th>
              <td colSpan={3}>
                <p className="flex items-center space-x-1">
                  <input
                    name="acc_bank1"
                    type="text"
                    value="농협"
                    placeholder="은행"
                    readOnly
                    className="border border-gray-300 rounded p-0.5 text-xs w-[60px] bg-gray-100"
                  />
                  <input
                    name="acc_number1"
                    type="text"
                    value="352-1961-156673"
                    placeholder="계좌번호"
                    readOnly
                    className="border border-gray-300 rounded p-0.5 text-xs w-[130px] bg-gray-100"
                  />
                  <input
                    name="acc_name1"
                    type="text"
                    value="노광택"
                    placeholder="예금주"
                    readOnly
                    className="border border-gray-300 rounded p-0.5 text-xs w-[80px] bg-gray-100"
                  />
                </p>
              </td>
            </tr>

            {/* 사업자 번호 */}
            <tr>
              <th>
                사업자 번호<span className="sf-req">*</span>
              </th>
              <td colSpan={3}>
                <p className="flex items-center space-x-1">
                  <input
                    name="br_number"
                    type="text"
                    value="345-92-01528"
                    className="border border-gray-300 rounded p-0.5 text-xs w-[120px]"
                  />
                  <button className="sf-btn-img--lg">상단내용 복사</button>
                </p>
              </td>
            </tr>

            {/* 법인명 */}
            <tr>
              <th>
                법인명<span className="sf-req">*</span>
              </th>
              <td>
                <p>
                  <input
                    name="br_company_name"
                    type="text"
                    value="화환앤플라워"
                    className="border border-gray-300 rounded p-0.5 text-xs w-full"
                  />
                </p>
              </td>

              <th>
                대표자성함<span className="sf-req">*</span>
              </th>
              <td>
                <p>
                  <input
                    name="br_representative"
                    type="text"
                    value="노광택"
                    className="border border-gray-300 rounded p-0.5 text-xs w-full"
                  />
                </p>
              </td>
            </tr>

            {/* 업태 */}
            <tr>
              <th>
                업태<span className="sf-req">*</span>
              </th>
              <td>
                <p>
                  <input
                    name="br_type"
                    type="text"
                    value="도소매"
                    className="border border-gray-300 rounded p-0.5 text-xs w-full"
                  />
                </p>
              </td>

              <th>
                종목<span className="sf-req">*</span>
              </th>
              <td>
                <p>
                  <input
                    name="br_item"
                    type="text"
                    value="생화"
                    className="border border-gray-300 rounded p-0.5 text-xs w-full"
                  />
                </p>
              </td>
            </tr>

            {/* 사업장 주소 */}
            <tr>
              <th>
                사업장 주소<span className="sf-req">*</span>
              </th>
              <td colSpan={3}>
                <p>
                  <input
                    name="br_address"
                    type="text"
                    value="강원 춘천시 동면 춘천로 527-60   1층"
                    className="border border-gray-300 rounded p-0.5 text-xs w-full"
                  />
                </p>
              </td>
            </tr>

            {/* 사업자 등록증 */}
            <tr>
              <th>사업자 등록증</th>
              <td colSpan={3}>
                <p className="flex items-center space-x-2">
                  <span className="text-xs">화환앤플라워 사업자.jpg</span>
                  <button type="button" className="sf-btn-img--md">
                    다운로드
                  </button>
                  <button type="button" className="sf-btn-img--md">
                    이미지 보기
                  </button>
                </p>
              </td>
            </tr>

            {/* 팩스설정 - 추가된 섹션 */}
            <tr>
              <th>팩스설정</th>
              <td colSpan={3}>
                <div className="flex gap-x-4">
                  {/* 수주 주문 도착시 */}
                  <div className="flex items-start gap-1 w-36">
                    <input
                      id="flower-handling"
                      name="flower-handling"
                      type="checkbox"
                      value="1"
                      checked
                      className="h-3 w-3 border-gray-300 rounded !m-0"
                    />
                    <label
                      htmlFor="flower-handling"
                      className="font-medium text-gray-900"
                    >
                      수주 주문 도착시
                    </label>
                  </div>
                  {/* 수주 주문 수정시 */}
                  <div className="flex items-start gap-1 w-36">
                    <input
                      id="flower-handling"
                      name="flower-handling"
                      type="checkbox"
                      value="1"
                      className="h-3 w-3 border-gray-300 rounded !m-0"
                    />
                    <label
                      htmlFor="flower-handling"
                      className="font-medium text-gray-900"
                    >
                      수주 주문 수정시
                    </label>
                  </div>
                  {/* 수주 주문 취소시 */}
                  <div className="flex items-start gap-1 w-36">
                    <input
                      id="flower-handling"
                      name="flower-handling"
                      type="checkbox"
                      value="1"
                      className="h-3 w-3 border-gray-300 rounded !m-0"
                    />
                    <label
                      htmlFor="flower-handling"
                      className="font-medium text-gray-900"
                    >
                      수주 주문 취소시
                    </label>
                  </div>
                  {/* 수주 주문 완료시 */}
                  <div className="flex items-start gap-1 w-36">
                    <input
                      id="flower-handling"
                      name="flower-handling"
                      type="checkbox"
                      value="1"
                      className="h-3 w-3 border-gray-300 rounded !m-0"
                    />
                    <label
                      htmlFor="flower-handling"
                      className="font-medium text-gray-900"
                    >
                      수주 주문 완료시
                    </label>
                  </div>
                </div>
              </td>
            </tr>

            {/* SMS설정 - 추가된 섹션 */}
            <tr>
              <th>SMS설정</th>
              <td colSpan={3}>
                <div className="flex gap-x-4">
                  {/* 수주 주문 도착시 */}
                  <div className="flex items-start gap-1 w-36">
                    <input
                      id="flower-handling"
                      name="flower-handling"
                      type="checkbox"
                      value="1"
                      checked
                      className="h-3 w-3 border-gray-300 rounded !m-0"
                    />
                    <label
                      htmlFor="flower-handling"
                      className="font-medium text-gray-900"
                    >
                      수주 주문 도착시
                    </label>
                  </div>
                  {/* 수주 주문 수정시 */}
                  <div className="flex items-start gap-1 w-36">
                    <input
                      id="flower-handling"
                      name="flower-handling"
                      type="checkbox"
                      value="1"
                      className="h-3 w-3 border-gray-300 rounded !m-0"
                    />
                    <label
                      htmlFor="flower-handling"
                      className="font-medium text-gray-900"
                    >
                      수주 주문 수정시
                    </label>
                  </div>
                  {/* 수주 주문 취소시 */}
                  <div className="flex items-start gap-1 w-36">
                    <input
                      id="flower-handling"
                      name="flower-handling"
                      type="checkbox"
                      value="1"
                      className="h-3 w-3 border-gray-300 rounded !m-0"
                    />
                    <label
                      htmlFor="flower-handling"
                      className="font-medium text-gray-900"
                    >
                      수주 주문 취소시
                    </label>
                  </div>
                  {/* 수주 주문 완료시 */}
                  <div className="flex items-start gap-1 w-36">
                    <input
                      id="flower-handling"
                      name="flower-handling"
                      type="checkbox"
                      value="1"
                      className="h-3 w-3 border-gray-300 rounded !m-0"
                    />
                    <label
                      htmlFor="flower-handling"
                      className="font-medium text-gray-900"
                    >
                      수주 주문 완료시
                    </label>
                  </div>
                </div>
              </td>
            </tr>

            {/* SMS설정 - 추가된 섹션 */}
            <tr>
              <th>팝업 알림 설정</th>
              <td colSpan={3}>
                <div className="flex gap-x-4">
                  {/* 주문도착 팝업 받음 */}
                  <div className="flex items-start gap-1 w-36">
                    <input
                      id="flower-handling"
                      name="flower-handling"
                      type="checkbox"
                      value="1"
                      checked
                      className="h-3 w-3 border-gray-300 rounded !m-0"
                    />
                    <label
                      htmlFor="flower-handling"
                      className="font-medium text-gray-900"
                    >
                      주문도착 팝업 받음
                    </label>
                  </div>
                  {/* 배송완료 팝업 받음 */}
                  <div className="flex items-start gap-1 w-36">
                    <input
                      id="flower-handling"
                      name="flower-handling"
                      type="checkbox"
                      value="1"
                      className="h-3 w-3 border-gray-300 rounded !m-0"
                    />
                    <label
                      htmlFor="flower-handling"
                      className="font-medium text-gray-900"
                    >
                      배송완료 팝업 받음
                    </label>
                  </div>
                  {/* 주문취소/거절 팝업 받음 */}
                  <div className="flex items-start gap-1 w-36">
                    <input
                      id="flower-handling"
                      name="flower-handling"
                      type="checkbox"
                      value="1"
                      className="h-3 w-3 border-gray-300 rounded !m-0"
                    />
                    <label
                      htmlFor="flower-handling"
                      className="font-medium text-gray-900"
                    >
                      주문취소/거절 팝업 받음
                    </label>
                  </div>
                  {/* 받은쪽지 팝업 받음 */}
                  <div className="flex items-start gap-1 w-36">
                    <input
                      id="flower-handling"
                      name="flower-handling"
                      type="checkbox"
                      value="1"
                      className="h-3 w-3 border-gray-300 rounded !m-0"
                    />
                    <label
                      htmlFor="flower-handling"
                      className="font-medium text-gray-900"
                    >
                      받은쪽지 팝업 받음
                    </label>
                  </div>
                </div>
              </td>
            </tr>

            {/* 품목 취급 설정 - 추가된 섹션 */}
            <tr>
              <th>과일상품 취급</th>
              <td>
                <input
                  id="flower-handling"
                  name="flower-handling"
                  type="checkbox"
                  value="1"
                  className="h-3 w-3 border-gray-300 rounded"
                />
              </td>

              <th>근조바구니 취급</th>
              <td>
                <input
                  id="flower-handling"
                  name="flower-handling"
                  type="checkbox"
                  value="1"
                  className="h-3 w-3 border-gray-300 rounded"
                />
              </td>
            </tr>

            <tr>
              <th>급배송 여부</th>
              <td>
                <input
                  id="flower-handling"
                  name="flower-handling"
                  type="checkbox"
                  value="1"
                  className="h-3 w-3 border-gray-300 rounded"
                />
              </td>

              <th>검정, 금박리본 가능여부</th>
              <td>
                <input
                  id="flower-handling"
                  name="flower-handling"
                  type="checkbox"
                  value="1"
                  className="h-3 w-3 border-gray-300 rounded"
                />
              </td>
            </tr>

            <tr>
              <th>원형화환 취급</th>
              <td>
                <input
                  id="flower-handling"
                  name="flower-handling"
                  type="checkbox"
                  value="1"
                  className="h-3 w-3 border-gray-300 rounded"
                />
              </td>

              <th>대/특대 취급</th>
              <td>
                <input
                  id="flower-handling"
                  name="flower-handling"
                  type="checkbox"
                  value="1"
                  className="h-3 w-3 border-gray-300 rounded"
                />
              </td>
            </tr>

            <tr>
              <th>4단/5단 취급</th>
              <td>
                <input
                  id="flower-handling"
                  name="flower-handling"
                  type="checkbox"
                  value="1"
                  className="h-3 w-3 border-gray-300 rounded"
                />
              </td>

              <th>오브제2단 취급</th>
              <td>
                <input
                  id="flower-handling"
                  name="flower-handling"
                  type="checkbox"
                  value="1"
                  className="h-3 w-3 border-gray-300 rounded"
                />
              </td>
            </tr>

            <tr>
              <th>분재 취급</th>
              <td>
                <input
                  id="flower-handling"
                  name="flower-handling"
                  type="checkbox"
                  value="1"
                  className="h-3 w-3 border-gray-300 rounded"
                />
              </td>

              <th>휴일배송 가능</th>
              <td>
                <input
                  id="flower-handling"
                  name="flower-handling"
                  type="checkbox"
                  value="1"
                  className="h-3 w-3 border-gray-300 rounded"
                />
              </td>
            </tr>

            {/* 야간 배송 */}
            <tr>
              <th>야간배송 가능</th>
              <td colSpan={3}>
                <div className="flex items-center gap-1">
                  <input
                    id="night-delivery"
                    name="night-delivery"
                    type="checkbox"
                    value="1"
                    className="h-3 w-3 border-gray-300 rounded"
                  />

                  <p className="text-blue-500">
                    야간배송 시간은 오후 8시~12시입니다.
                  </p>
                </div>
              </td>
            </tr>

            {/* 영업시간 */}
            <tr>
              <th>영업시간</th>
              <td colSpan={3}>
                <input
                  id="business-hours"
                  name="business-hours"
                  className="border border-gray-300 rounded p-0.5 text-xs w-2/3"
                  placeholder="평일 9:00-18:00, 토요일 9:00-15:00, 일요일 휴무"
                />
                <p className="text-blue-500 mt-0.5">
                  예) 평일 9:00-18:00, 토요일 9:00-15:00, 일요일 휴무
                </p>
              </td>
            </tr>

            {/* 배송안내 */}
            <tr>
              <th>배송안내</th>
              <td colSpan={3}>
                <input
                  id="delivery-notes"
                  name="delivery-notes"
                  className="border border-gray-300 rounded p-0.5 text-xs w-[200px]"
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* 저장 버튼 */}
        <div className="mt-3 flex justify-center gap-x-2">
          <button type="submit" className="sf-btn sf-btn--primary sf-btn--md">
            저장하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
