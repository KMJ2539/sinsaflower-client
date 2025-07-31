import Link from "next/link";
import { getUser } from "@/features/auth/services/auth.server";
import { formatCurrency } from "../utils/format";

const SideMenu = async () => {
  const userInfo = await getUser();

  return (
    <aside className="md:col-span-2 space-y-4">
      <div className="bg-white p-4 rounded shadow-sm text-sm">
        {userInfo != null ? (
          <div>
            <h2 className="font-bold text-center">
              {userInfo?.name || userInfo?.username || userInfo?.email} 님
            </h2>
            <p className="text-gray-600 text-center">
              잔금총액: <strong>{formatCurrency(userInfo?.balance)}원</strong>
            </p>
            <div className="border-b my-2" />
            <div className="mt-1 space-y-0.5">
              <p className="flex justify-between">
                신사 포인트
                <strong>{formatCurrency(userInfo?.sinsaPoints)}P</strong>
              </p>
              <p className="flex justify-between">
                등급 포인트
                <strong>{formatCurrency(userInfo?.gradePoints)}P</strong>
              </p>
            </div>
            <div className="my-2 p-2 px-4 bg-gray-100 rounded space-y-0.5">
              <div className="flex justify-between">
                수주미확인
                <strong>{userInfo?.unconfirmedOrders} 건</strong>
              </div>
              <div className="flex justify-between">
                수주미배송
                <strong>{userInfo?.undeliveredOrders} 건</strong>
              </div>
            </div>
            <button className="mt-1 w-full border border-green-800 text-green-800 bg-green-100 py-1 rounded">
              신사멤버십 혜택보기
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-base text-center px-2 py-5">
              회원가입을 하시면 신사플라워의
              <br />
              다양한 혜택을 받으실 수 있습니다.
            </h2>

            <Link href="/login">
              <button className="my-2 w-full bg-primary hover:bg-primary-hover text-white py-2 rounded text-md">
                로그인
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* 주문관리 메뉴 */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold text-md mb-2 border-b pb-1">주문관리</h3>
        <ul className="space-y-1 text-sm">
          <li>
            <Link href="/members" className="hover:underline">
              회원검색
            </Link>
          </li>
          <li>
            <Link href="/orders/create" className="hover:underline text-left">
              발주
            </Link>
          </li>
          <li>
            <Link href="/orders/purchase" className="hover:underline">
              전체발주리스트
            </Link>
          </li>
          <li>
            <Link href="/orders/sales" className="hover:underline">
              전체수주리스트
            </Link>
          </li>
          <li>
            <Link href="/orders/pending" className="hover:underline">
              미확인주문리스트
            </Link>
          </li>
          <li>
            <Link href="/orders/canceled" className="hover:underline">
              취소주문리스트
            </Link>
          </li>
        </ul>
      </div>

      {/* 게시판 메뉴 */}
      {/* <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold text-md mb-2 border-b pb-1">게시판</h3>
        <ul className="space-y-1 text-sm">
          <li>
            <Link href="/notice" className="hover:underline">
              공지사항
            </Link>
          </li>
          <li>
            <Link href="/board" className="hover:underline">
              자유게시판
            </Link>
          </li>
        </ul>
      </div> */}

      {/* 정산관리 메뉴 */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold text-md mb-2 border-b pb-1">정산관리</h3>
        <ul className="space-y-1 text-sm">
          <li>
            <Link href="/settlement-detail" className="hover:underline">
              정산내역
            </Link>
          </li>
          <li>
            <a href="#" className="hover:underline">
              충전하기
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              출금요청
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              계산서 발행내역
            </a>
          </li>
        </ul>
      </div>

      {/* 관리자 메뉴 - 관리자만 표시
      {isAdmin && (
        <div className="bg-red-50 p-2 rounded shadow-sm border border-red-200">
          <h3 className="font-semibold text-xs border-b border-red-200 pb-1 mb-1 text-red-700">
            관리자
          </h3>
          <ul className="space-y-0.5 text-xs">
            <li>
              <Link
                href="/admin-dashboard"
                className="hover:underline text-left"
              >
                회원 승인 관리
              </Link>
            </li>
            <li>
              <a
                href="/admin-member-approval"
                className="hover:underline"
              >
                회원 승인
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-red-600">
                주문 관리
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-red-600">
                시스템 설정
              </a>
            </li>
          </ul>
        </div>
      )} */}
    </aside>
  );
};

export default SideMenu;
