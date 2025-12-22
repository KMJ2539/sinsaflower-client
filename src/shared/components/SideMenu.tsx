import Link from "next/link";
import { getUser } from "@/features/auth/server/auth.server";
import { formatCurrency } from "../utils/format";

const SideMenu = async () => {
  const userInfo = await getUser();

  return (
    <aside className="md:col-span-2 space-y-6">
      {/* 사용자 정보 카드 */}
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 text-sm">
        {userInfo != null ? (
          <div>
            <h2 className="font-bold text-center text-lg text-gray-800 mb-2">
              {userInfo?.name || userInfo?.username || "다경플라워"} 님
            </h2>
            <p className="text-gray-600 text-center mb-3">
              잔금총액:{" "}
              <strong className="text-primary text-lg">
                {formatCurrency(userInfo?.balance)}원
              </strong>
            </p>
            <div className="border-b border-gray-200 my-3" />
            <div className="mt-3 space-y-2">
              <p className="flex justify-between items-center">
                <span className="text-gray-600">신사 포인트</span>
                <strong className="text-accent">
                  {formatCurrency(userInfo?.sinsaPoints)}P
                </strong>
              </p>
              <p className="flex justify-between items-center">
                <span className="text-gray-600">등급 포인트</span>
                <strong className="text-accent">
                  {formatCurrency(userInfo?.gradePoints)}P
                </strong>
              </p>
            </div>
            <div className="my-3 p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg space-y-2 border border-primary/20">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">수주미확인</span>
                <strong className="text-danger">
                  {userInfo?.unconfirmedOrders || 0} 건
                </strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">수주미배송</span>
                <strong className="text-danger">
                  {userInfo?.undeliveredOrders || 0} 건
                </strong>
              </div>
            </div>
            <button
              type="submit"
              className="sf-btn sf-btn--primary sf-btn--md mt-2"
            >
              신사멤버십 혜택보기
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-base text-center px-2 py-5 text-gray-700">
              회원가입을 하시면
              <br />
              <span className="text-primary font-semibold">신사플라워</span> 의
              <br />
              다양한 혜택을 받으실 수 있습니다.
            </h2>

            <Link href="/login">
              <button className="my-2 w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-lg text-md font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                로그인
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* 주문관리 메뉴 */}
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200">
        <h3 className="font-semibold text-lg mb-4 border-b border-gray-200 pb-2 text-gray-800">
          주문관리
        </h3>
        <ul className="space-y-2 text-sm">
          <li>
            <Link
              href="/members"
              className="hover:text-primary transition-colors duration-200 flex items-center py-1"
            >
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              회원검색
            </Link>
          </li>
          <li>
            <Link
              href="/orders/create"
              className="hover:text-primary transition-colors duration-200 flex items-center py-1"
            >
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              발주
            </Link>
          </li>
          <li>
            <Link
              href="/orders/purchase"
              className="hover:text-primary transition-colors duration-200 flex items-center py-1"
            >
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              전체발주리스트
            </Link>
          </li>
          <li>
            <Link
              href="/orders/sales"
              className="hover:text-primary transition-colors duration-200 flex items-center py-1"
            >
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              전체수주리스트
            </Link>
          </li>
          <li>
            <Link
              href="/orders/pending"
              className="hover:text-primary transition-colors duration-200 flex items-center py-1"
            >
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              미확인주문리스트
            </Link>
          </li>
          <li>
            <Link
              href="/orders/canceled"
              className="hover:text-primary transition-colors duration-200 flex items-center py-1"
            >
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              취소주문리스트
            </Link>
          </li>
        </ul>
      </div>

      {/* 정산관리 메뉴 */}
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200">
        <h3 className="font-semibold text-lg mb-4 border-b border-gray-200 pb-2 text-gray-800">
          정산관리
        </h3>
        <ul className="space-y-2 text-sm">
          <li>
            <Link
              href="/settlement-detail"
              className="hover:text-primary transition-colors duration-200 flex items-center py-1"
            >
              <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
              정산내역
            </Link>
          </li>
          <li>
            <Link
              href="/charges"
              className="hover:text-primary transition-colors duration-200 flex items-center py-1"
            >
              <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
              충전하기
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-primary transition-colors duration-200 flex items-center py-1"
            >
              <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
              출금요청
            </a>
          </li>
          <li>
            <Link
              href="/invoice/history"
              className="hover:text-primary transition-colors duration-200 flex items-center py-1"
            >
              <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
              계산서 발행내역
            </Link>
          </li>
        </ul>
      </div>

      {/* 커뮤니티 메뉴 */}
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200">
        <h3 className="font-semibold text-lg mb-4 border-b border-gray-200 pb-2 text-gray-800">
          커뮤니티
        </h3>
        <ul className="space-y-2 text-sm">
          <li>
            <Link
              href="/community/notices"
              className="hover:text-primary transition-colors duration-200 flex items-center py-1"
            >
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              공지사항
            </Link>
          </li>
          <li>
            <Link
              href="/community"
              className="hover:text-primary transition-colors duration-200 flex items-center py-1"
            >
              <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
              게시판
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideMenu;
