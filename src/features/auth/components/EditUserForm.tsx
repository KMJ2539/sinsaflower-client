"use client";

import { useState } from "react";

const EditUserForm = () => {
  const [error, setError] = useState(null);

  return (
    <div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form id="profile-edit-form">
        <table className="w-full border-collapse text-xs border">
          <tbody>
            {/* 아이디 */}
            <tr className="border-y">
              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50 w-[100px]">
                아이디
              </th>
              <td colSpan={3} className="py-1 px-2">
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
            <tr className="border-b">
              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                비밀번호
              </th>
              <td className="py-1 px-2">
                <p>
                  <input
                    name="password"
                    type="password"
                    className="border border-gray-300 rounded p-0.5 text-xs w-full"
                  />
                </p>
                <p className="text-xs text-blue-500 mt-0.5">
                  비밀번호는 입력하지 않으면 변경되지 않습니다.
                </p>
              </td>

              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                비밀번호 확인
              </th>
              <td className="py-1 px-2">
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
            <tr className="border-b">
              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                화원명 <span className="text-red-500">*</span>
              </th>
              <td className="py-1 px-2">
                <p>
                  <input
                    name="office_name"
                    type="text"
                    value="화환앤플라워"
                    className="border border-gray-300 rounded p-0.5 text-xs w-full"
                  />
                </p>
              </td>

              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                대표자명 <span className="text-red-500">*</span>
              </th>
              <td className="py-1 px-2">
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
            <tr className="border-b">
              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                게시판 닉네임 <span className="text-red-500">*</span>
              </th>
              <td colSpan={3} className="py-1 px-2">
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
            <tr className="border-b">
              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                기본배송지
              </th>
              <td colSpan={3} className="py-1 px-2">
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
            <tr className="border-b">
              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                배송지역정보
              </th>
              <td className="py-1 px-2">
                <p>
                  <button
                    className="inline-block w-[110px] py-0.5 rounded text-xs"
                    style={{
                      background: 'url("/images/btn_110.png") no-repeat',
                    }}
                  >
                    배송지역 수정
                  </button>
                </p>
              </td>
            </tr>

            {/* 화원 실제주소 */}
            <tr className="border-b">
              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                화원 실제주소 <span className="text-red-500">*</span>
              </th>
              <td colSpan={3} className="py-1 px-2">
                <p className="flex items-center space-x-1">
                  <input
                    name="zipcode"
                    type="text"
                    value="24210"
                    className="border border-gray-300 rounded p-0.5 text-xs w-[70px]"
                  />
                  <button
                    type="button"
                    className="py-0.5 rounded text-xs w-[70px] text-center"
                    style={{
                      background: 'url("/images/btn_70.png") no-repeat',
                    }}
                  >
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
            <tr className="border-b">
              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                대표전화 <span className="text-red-500">*</span>
              </th>
              <td className="py-1 px-2">
                <p>
                  <input
                    name="tel"
                    type="text"
                    value="010-5174-0942"
                    className="border border-gray-300 rounded p-0.5 text-xs w-full"
                  />
                </p>
              </td>

              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                팩스번호 <span className="text-red-500">*</span>
              </th>
              <td className="py-1 px-2">
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
            <tr className="border-b">
              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                대표휴대폰 <span className="text-red-500">*</span>
              </th>
              <td className="py-1 px-2">
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
            <tr className="border-b">
              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                계좌번호 <span className="text-red-500">*</span>
              </th>
              <td colSpan={3} className="py-1 px-2">
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

            {/* 가상계좌 */}
            {/* <tr className="border-b">
              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                가상계좌
              </th>
              <td colSpan={3} className="py-1 px-2">
                <p className="flex items-center space-x-1">
                  <input
                    name="virtual_bank"
                    type="text"
                    value="농협중앙회"
                    placeholder="은행"
                    readOnly
                    className="border border-gray-300 rounded p-0.5 text-xs w-[60px] bg-gray-100"
                  />
                  <input
                    name="virtual_number"
                    type="text"
                    value="79012933698557"
                    placeholder="계좌번호"
                    readOnly
                    className="border border-gray-300 rounded p-0.5 text-xs w-[130px] bg-gray-100"
                  />
                  <input
                    name="virtual_name"
                    type="text"
                    value="노광택"
                    placeholder="예금주"
                    readOnly
                    className="border border-gray-300 rounded p-0.5 text-xs w-[80px] bg-gray-100"
                  />
                  <button
                    type="button"
                    className="py-0.5 rounded text-xs w-[50px] text-center"
                    style={{
                      background: 'url("/images/btn_50.png") no-repeat',
                    }}
                  >
                    신청
                  </button>
                </p>
                <p className="text-blue-600 mt-0.5">
                  충전은 가상계좌로 입금하시면 자동 충전됩니다.
                </p>
                <p className="text-blue-600">
                  마지막 충전 일시는 2025-04-28 12:29 입니다.
                </p>
              </td>
            </tr> */}

            {/* 사업자 번호 */}
            <tr className="border-b">
              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                사업자 번호 <span className="text-red-500">*</span>
              </th>
              <td colSpan={3} className="py-1 px-2">
                <p className="flex items-center space-x-1">
                  <input
                    name="br_number"
                    type="text"
                    value="345-92-01528"
                    className="border border-gray-300 rounded p-0.5 text-xs w-[120px]"
                  />
                  <button
                    className="inline-block w-[110px] py-0.5 rounded text-xs"
                    style={{
                      background: 'url("/images/btn_110.png") no-repeat',
                    }}
                  >
                    상단내용 복사
                  </button>
                </p>
              </td>
            </tr>

            {/* 법인명 */}
            <tr className="border-b">
              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                법인명 <span className="text-red-500">*</span>
              </th>
              <td className="py-1 px-2">
                <p>
                  <input
                    name="br_company_name"
                    type="text"
                    value="화환앤플라워"
                    className="border border-gray-300 rounded p-0.5 text-xs w-full"
                  />
                </p>
              </td>

              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                대표자성함 <span className="text-red-500">*</span>
              </th>
              <td className="py-1 px-2">
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
            <tr className="border-b">
              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                업태 <span className="text-red-500">*</span>
              </th>
              <td className="py-1 px-2">
                <p>
                  <input
                    name="br_type"
                    type="text"
                    value="도소매"
                    className="border border-gray-300 rounded p-0.5 text-xs w-full"
                  />
                </p>
              </td>

              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                종목 <span className="text-red-500">*</span>
              </th>
              <td className="py-1 px-2">
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
            <tr className="border-b">
              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                사업장 주소 <span className="text-red-500">*</span>
              </th>
              <td colSpan={3} className="py-1 px-2">
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
            <tr className="border-b">
              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                사업자 등록증
              </th>
              <td colSpan={3} className="py-1 px-2">
                <p className="flex items-center space-x-1">
                  <span className="text-xs">화환앤플라워 사업자.jpg</span>
                  <button
                    type="button"
                    className="py-0.5 rounded text-xs w-[70px] text-center"
                    style={{
                      background: 'url("/images/btn_70.png") no-repeat',
                    }}
                  >
                    다운로드
                  </button>
                  <button
                    type="button"
                    className="py-0.5 rounded text-xs w-[70px] text-center"
                    style={{
                      background: 'url("/images/btn_70.png") no-repeat',
                    }}
                  >
                    이미지 보기
                  </button>
                </p>
              </td>
            </tr>

            {/* 팩스설정 - 추가된 섹션 */}
            <tr className="border-b">
              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                팩스설정
              </th>
              <td colSpan={3} className="py-1 px-2">
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
            <tr className="border-b">
              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                SMS설정
              </th>
              <td colSpan={3} className="py-1 px-2">
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
            <tr className="border-b">
              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                팝업 알림 설정
              </th>
              <td colSpan={3} className="py-1 px-2">
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
            <tr className="border-b">
              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                과일상품 취급
              </th>
              <td className="py-1 px-2">
                <input
                  id="flower-handling"
                  name="flower-handling"
                  type="checkbox"
                  value="1"
                  className="h-3 w-3 border-gray-300 rounded"
                />
              </td>

              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                근조바구니 취급
              </th>
              <td className="py-1 px-2">
                <input
                  id="flower-handling"
                  name="flower-handling"
                  type="checkbox"
                  value="1"
                  className="h-3 w-3 border-gray-300 rounded"
                />
              </td>
            </tr>

            <tr className="border-b">
              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                급배송 여부
              </th>
              <td className="py-1 px-2">
                <input
                  id="flower-handling"
                  name="flower-handling"
                  type="checkbox"
                  value="1"
                  className="h-3 w-3 border-gray-300 rounded"
                />
              </td>

              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                검정, 금박리본 가능여부
              </th>
              <td className="py-1 px-2">
                <input
                  id="flower-handling"
                  name="flower-handling"
                  type="checkbox"
                  value="1"
                  className="h-3 w-3 border-gray-300 rounded"
                />
              </td>
            </tr>

            <tr className="border-b">
              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                원형화환 취급
              </th>
              <td className="py-1 px-2">
                <input
                  id="flower-handling"
                  name="flower-handling"
                  type="checkbox"
                  value="1"
                  className="h-3 w-3 border-gray-300 rounded"
                />
              </td>

              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                대/특대 취급
              </th>
              <td className="py-1 px-2">
                <input
                  id="flower-handling"
                  name="flower-handling"
                  type="checkbox"
                  value="1"
                  className="h-3 w-3 border-gray-300 rounded"
                />
              </td>
            </tr>

            <tr className="border-b">
              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                4단/5단 취급
              </th>
              <td className="py-1 px-2">
                <input
                  id="flower-handling"
                  name="flower-handling"
                  type="checkbox"
                  value="1"
                  className="h-3 w-3 border-gray-300 rounded"
                />
              </td>

              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                오브제2단 취급
              </th>
              <td className="py-1 px-2">
                <input
                  id="flower-handling"
                  name="flower-handling"
                  type="checkbox"
                  value="1"
                  className="h-3 w-3 border-gray-300 rounded"
                />
              </td>
            </tr>

            <tr className="border-b">
              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                분재 취급
              </th>
              <td className="py-1 px-2">
                <input
                  id="flower-handling"
                  name="flower-handling"
                  type="checkbox"
                  value="1"
                  className="h-3 w-3 border-gray-300 rounded"
                />
              </td>

              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                휴일배송 가능
              </th>
              <td className="py-1 px-2">
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
            <tr className="border-b">
              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                야간배송 가능
              </th>
              <td colSpan={3} className="py-1 px-2">
                <div className="flex">
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
            <tr className="border-b">
              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                영업시간
              </th>
              <td colSpan={3} className="py-1 px-2">
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
            <tr className="border-b">
              <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
                배송안내
              </th>
              <td colSpan={3} className="py-1 px-2">
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
          <button
            type="button"
            className="px-5 py-1 bg-gray-200 text-gray-900 rounded text-xs font-medium"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-5 py-1 bg-amber-200 text-black rounded text-xs font-medium"
          >
            저장하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
