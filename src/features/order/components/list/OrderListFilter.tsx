import { MonthNavigation } from "./MonthNavigation";

// app/orders/purchase/_components/OrderListFilterBar.tsx
export function OrderListFilter() {
  return (
    <div className="space-y-8">
      {/* 메인 필터 */}

      <div className="flex flex-wrap items-center gap-3 text-sm">
        <select className="border border-gray-300 py-2 px-3 rounded-lg bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
          <option>배송요구일</option>
          <option>주문일</option>
          <option>배송일</option>
        </select>

        <div className="flex items-center gap-2">
          <input
            type="date"
            className="border border-gray-300 w-[130px] py-1.5 px-3 rounded-lg bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            defaultValue="2025-07-01"
          />
          <span className="text-gray-500 font-medium">~</span>
          <input
            type="date"
            className="border border-gray-300 w-[130px] py-1.5 px-3 rounded-lg bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            defaultValue="2025-08-31"
          />
        </div>

        <select className="border border-gray-300 py-2 px-3 rounded-lg bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
          <option>배송상태(전체)</option>
          <option>미확인</option>
          <option>주문접수</option>
          <option>배송준비</option>
          <option>배송완료</option>
          <option>주문거절</option>
        </select>

        <select className="border border-gray-300 py-2 px-3 rounded-lg bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
          <option>1.발주화원명</option>
          <option>2.수주화환명</option>
        </select>

        <button
          type="submit"
          className="sf-btn sf-btn--primary sf-btn--md px-6"
        >
          검색
        </button>
        <button type="reset" className="sf-btn sf-btn--secondary sf-btn--md">
          초기화
        </button>
      </div>

      {/* Color Notice*/}

      <div className="flex flex-wrap gap-4 text-xs text-gray-700 pb-2 pl-2">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-pink-300 to-pink-400 h-4 w-4 rounded-md shadow-sm" />
          <span className="font-medium">당일배송</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-white h-4 w-4 rounded-md border-2 border-gray-300 shadow-sm" />
          <span className="font-medium">당일외배송</span>
        </div>
        {/* 
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-4 w-4 rounded-md shadow-sm" />
          <span className="font-medium">배송시간초과</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-green-400 to-green-500 h-4 w-4 rounded-md shadow-sm" />
          <span className="font-medium">본부주문건</span>
        </div> */}
      </div>
    </div>
  );
}
