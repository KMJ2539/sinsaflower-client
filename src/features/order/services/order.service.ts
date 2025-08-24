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

export async function getOrderByNumber(
  orderNumber: string
): Promise<OrderFormValue> {
  // TODO: 실제 API 호출로 변경
  // 현재는 더미 데이터 반환
  return {
    specialNote: "당일 배송 특이사항",
    region: "강원도",
    shopName: "춘천시 플라워뱅크",
    phone: "010-1234-5678",
    productName: "근조3",
    productDetail: "근조3단",
    quantity: 1,
    originPrice: 0,
    price: 50000,
    payment: 50000,
    orderCustomerName: "",
    orderCustomerPhone: "",
    orderCustomerMobile: "",
    receiverName: "이지원",
    receiverPhone: "010-9876-5432",
    receiverMobile: "010-9876-5432",
    deliveryDate: "2025-08-09",
    deliveryHours: "default",
    deliveryMinutes: "0",
    deliveryType: "까지",
    eventHours: "12",
    eventMinutes: "18",
    deliveryPlace:
      "강원특별자치도 강릉시 강릉대로419번길 42 동인병원장례식장 3호실",
    messages: [{ text: "삼가 故人의 冥福을 빕니다" }],
    senderList: [{ name: "전국자치단체공무직본부 서울지역지부" }],
    options: {},
    card: "",
    request: "현장사진부탁합니다",
    hideDeliveryPhoto: true,
    productImage: new File([], ""),
  };
}
