import { clientRequest } from "@/shared/lib/http/client";
import { OrderFormValue } from "../types/orderFormValue";
import { OrderFilter } from "../types/orderFilter";
import { OrderPurchaseValue } from "../types/orderPurchaseValue";

//발주
export async function createOrder(orderFormData: OrderFormValue) {
  const { productImage, ...rest } = orderFormData;

  const formData = new FormData();
  formData.append(
    "request",
    new Blob([JSON.stringify(rest)], { type: "application/json" })
  );
  if (productImage) formData.append("productImage", productImage);

  return clientRequest({
    url: "/api/orders/create",
    method: "POST",
    data: formData,
  });
}

//발주리스트 조회(월별)
export async function getMonthOrders(month: string) {
  return clientRequest({
    url: "/api/orders/purchase",
    method: "GET",
    params: { month },
  });
}

//발주리스트 조회 (필터)
export async function getOrders(filter: OrderFilter) {
  return clientRequest<OrderPurchaseValue[]>({
    url: "/api/orders/purchase",
    method: "GET",
    params: filter,
  });
}

//발주리스트 요약
export async function getOrderSummary() {
  return clientRequest({
    url: "/api/orders/purchase/summary",
    method: "GET",
  });
}
