import type { User } from "@/shared/types/user";
import { clientRequest } from "@/shared/lib/http/client";

// 로그인
export async function login(loginId: string, password: string) {
  return clientRequest({
    url: "/api/auth/login",
    method: "POST",
    data: { loginId, password },
  });
}

// 회원가입
export async function signup(inputs: RegisterFormInputs) {
  const { bankCertFile, businessCertFile, ...rest } = inputs;

  const formData = new FormData();
  formData.append(
    "request",
    new Blob([JSON.stringify(rest)], { type: "application/json" })
  );
  if (bankCertFile) formData.append("bankCertFile", bankCertFile);
  if (businessCertFile) formData.append("businessCertFile", businessCertFile);

  return clientRequest({
    url: "/api/auth/signup",
    method: "POST",
    data: formData,
    // FormData 사용 시 Content-Type은 axios가 자동으로 설정함
  });
}

// 아이디 중복 확인
export async function checkUserId(userId: string) {
  return clientRequest({
    url: "/api/auth/check-userid",
    method: "GET",
    params: { userId },
  });
}

// 관리자 - 대기중인 사용자 목록 조회
export async function getPendingUsers() {
  return clientRequest<User[]>({
    url: "/api/auth/admin/pending-users",
    method: "GET",
  });
}

// 관리자 - 사용자 승인
export async function approveUser(userId: string) {
  return clientRequest({
    url: `/api/auth/admin/approve/${userId}`,
    method: "POST",
  });
}

// 관리자 - 사용자 거부
export async function rejectUser(userId: string, reason: string) {
  return clientRequest({
    url: `/api/auth/admin/reject/${userId}`,
    method: "POST",
    params: { reason },
  });
}


{
  request  : {
    "specialNote": "꽃다발에 리본 추가해주세요.",
  "region": "서울 강남구",
  "shopName": "신사플라워",
  "phone": "02-1234-5678",
  "productName": "장미 꽃다발",
  "productDetail": "붉은 장미 50송이, 리본 포함",
  "quantity": 1,
  "originPrice": 80000,
  "price": 75000,
  "payment": 75000,
  "image": null,
  "orderCustomerName": "김주문",
  "orderCustomerPhone": "02-8765-4321",
  "orderCustomerMobile": "010-2222-3333",
  "receiverName": "이수령",
  "receiverPhone": "02-5555-7777",
  "receiverMobile": "010-9999-8888",
  "deliveryDate": "2025-08-15",
  "deliveryHours" : "15",
  "deliveryMinutes" : "30",
  "deliveryType": "까지",
  "eventHours": "18",
  "eventMinutes": "00";
  "deliveryPlace": "서울특별시 강남구 테헤란로 123",
  "messages": [
    { "text": "축하합니다!" },
    { "text": "행복하세요!" }
  ],
  "senderList": [
    { "name": "박보내" }
  ],
  "options": {
    "케이크": { "checked": true, "price": 20000 },
    "초": { "checked": false, "price": 0 }
  },
  "card": "백색 카드",
  "request": "도착 전에 미리 전화 주세요.",
  "hideDeliveryPhoto": false
}