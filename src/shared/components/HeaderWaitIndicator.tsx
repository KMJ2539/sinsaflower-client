"use client";

import { useEffect, useState } from "react";

type IncomingOrder = {
  orderNumber: string;
  region: string;
  deliveryDate: string;
  productType: string;
  basePrice: number;
  notes: string;
};

export default function HeaderWaitIndicator() {
  const [isWaiting, setIsWaiting] = useState(false);
  const [order, setOrder] = useState<IncomingOrder | null>(null);

  useEffect(() => {
    const onWaitStart = () => setIsWaiting(true);
    const onWaitCancel = () => setIsWaiting(false);
    const onOrderArrived = (e: Event) => {
      const ce = e as CustomEvent<IncomingOrder>;
      setIsWaiting(false);
      setOrder(ce.detail || null);
    };
    const onOrderClear = () => setOrder(null);

    window.addEventListener("sf_wait_start", onWaitStart as EventListener);
    window.addEventListener("sf_wait_cancel", onWaitCancel as EventListener);
    window.addEventListener("sf_order_arrived", onOrderArrived as EventListener);
    window.addEventListener("sf_order_clear", onOrderClear as EventListener);

    return () => {
      window.removeEventListener("sf_wait_start", onWaitStart as EventListener);
      window.removeEventListener("sf_wait_cancel", onWaitCancel as EventListener);
      window.removeEventListener("sf_order_arrived", onOrderArrived as EventListener);
      window.removeEventListener("sf_order_clear", onOrderClear as EventListener);
    };
  }, []);

  const accept = () => {
    if (order) {
      window.dispatchEvent(new CustomEvent("sf_order_accept", { detail: order }));
    }
    window.dispatchEvent(new CustomEvent("sf_order_clear"));
  };
  const reject = () => {
    if (order) {
      window.dispatchEvent(new CustomEvent("sf_order_reject", { detail: order }));
    }
    window.dispatchEvent(new CustomEvent("sf_order_clear"));
  };

  if (!isWaiting && !order) return null;

  return (
    <div className="ml-4 flex items-center gap-3">
      {isWaiting && !order ? (
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
          <span className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent" />
          <span className="text-xs text-blue-700">주문 실시간 대기 중</span>
          <button
            className="text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => window.dispatchEvent(new CustomEvent("sf_wait_cancel"))}
          >
            대기 취소
          </button>
        </div>
      ) : order ? (
        <div className="flex items-center gap-3 px-3 py-1 rounded-full bg-amber-50 border border-amber-200">
          <span className="text-xs font-semibold text-amber-700">자동 배정 주문 도착</span>
          <span className="text-xs text-gray-700">#{order.orderNumber}</span>
          <span className="text-xs text-gray-600">{order.region}</span>
          <span className="text-xs text-gray-600">{order.productType}</span>
          <button
            className="text-xs px-2 py-1 bg-primary text-white rounded hover:bg-primary/90"
            onClick={accept}
          >
            승락
          </button>
          <button
            className="text-xs px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            onClick={reject}
          >
            거절
          </button>
        </div>
      ) : null}
    </div>
  );
}
