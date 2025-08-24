"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { OrderFilter } from "../types/orderFilter";
import { OrderStatus } from "../types/orderStatus";

type OrderSearchCtx = {
  filter: OrderFilter;
  setFilter: React.Dispatch<React.SetStateAction<OrderFilter>>;
  /** 검색 버튼 누를 때마다 증가하는 신호값 (구독자들이 useEffect로 감지) */
  searchSignal: number;
  triggerSearch: () => void;
  resetFilter: () => void;
};

// 필터 초기값
export const defaultOrderFilter: OrderFilter = {
  dateField: "deliveryDate",
  startDate: "",
  endDate: "",
  orderStatus: undefined,
  searchField: "purchaseShopName",
  searchKeyword: "",
};

const OrderSearchContext = createContext<OrderSearchCtx | null>(null);

export function OrderSearchProvider({
  children,
  initialFilter = defaultOrderFilter,
  autoSearchOnMount = true,
  fixedStatus,
}: {
  children: React.ReactNode;
  initialFilter?: OrderFilter;
  autoSearchOnMount?: boolean;
  fixedStatus?: OrderStatus;
}) {
  const [filter, setFilter] = useState<OrderFilter>({
    ...initialFilter,
    orderStatus: fixedStatus,
  });
  const [searchSignal, setSearchSignal] = useState(0);

  const triggerSearch = () => setSearchSignal((s) => s + 1);
  const resetFilter = () =>
    setFilter({ ...initialFilter, orderStatus: fixedStatus });

  useEffect(() => {
    if (autoSearchOnMount) triggerSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({ filter, setFilter, searchSignal, triggerSearch, resetFilter }),
    [filter, searchSignal]
  );

  return (
    <OrderSearchContext.Provider value={value}>
      {children}
    </OrderSearchContext.Provider>
  );
}

/** 전체 컨텍스트 접근 */
export function useOrderSearch(): OrderSearchCtx {
  const ctx = useContext(OrderSearchContext);
  if (!ctx)
    throw new Error(
      "useOrderListContext must be used within <OrderListProvider>"
    );
  return ctx;
}
