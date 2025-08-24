"use client";

import { useOrderSearch } from "../../context/order-search.context";
import { OrderStatus } from "../../types/orderStatus";

export function OrderListFilter({
  fixedStatus,
}: {
  fixedStatus?: OrderStatus;
}) {
  const { filter, setFilter, triggerSearch, resetFilter } = useOrderSearch();

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  return (
    <div className="space-y-8">
      {/* 메인 필터 */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <select
          className="sf-select"
          name="dateField"
          value={filter.dateField}
          onChange={handleFilterChange}
        >
          <option value="">배송요구일</option>
          <option value="">주문일</option>
          <option value="">배송일</option>
        </select>

        <div className="flex items-center gap-1">
          <input
            type="date"
            name="startDate"
            className="sf-input--date"
            value={filter.startDate}
            onChange={handleFilterChange}
          />
          <span className="text-gray-500 font-medium">~</span>
          <input
            type="date"
            name="endDate"
            className="sf-input--date"
            value={filter.endDate}
            onChange={handleFilterChange}
          />
        </div>

        {!fixedStatus && (
          <select
            className="sf-select"
            name="orderStatus"
            value={filter.orderStatus}
            onChange={handleFilterChange}
          >
            <option>배송상태(전체)</option>
            <option value="PENDING">미확인</option>
            <option value="CONFIRMED">주문접수</option>
            <option value="PREPARING">배송준비</option>
            <option value="DELIVERED">배송완료</option>
            <option value="CANCELED">주문거절</option>
          </select>
        )}

        <select
          className="sf-select"
          name="searchField"
          value={filter.searchField}
          onChange={handleFilterChange}
        >
          <option value="purchaseShopName">발주화원명</option>
          <option value="salesShopName">수주화환명</option>
        </select>

        <input
          className="sf-select w-28"
          name="searchKeyword"
          value={filter.searchKeyword}
          onChange={handleFilterChange}
        />

        <button
          type="submit"
          className="sf-btn sf-btn--primary sf-btn--md px-6"
          onClick={triggerSearch}
        >
          검색
        </button>
        <button
          type="reset"
          className="sf-btn sf-btn--secondary sf-btn--md"
          onClick={resetFilter}
        >
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
