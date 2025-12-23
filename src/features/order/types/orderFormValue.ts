export type OrderFormValue = {
  specialNote?: string;
  // 주문 유형: 회원 선택 발주 | 자동 배정 발주
  orderType?: "member" | "auto" | "";
  region: string;
  shopName: string;
  phone: string;
  receiverShopId?: string;
  // 자동 배정 발주 시 선택하는 지역
  autoSido?: string;
  autoSigungu?: string;
  productName: string;
  productDetail?: string;
  quantity: number;
  originPrice: number;
  price: number;
  payment: number;
  image?: File;
  orderCustomerName?: string;
  orderCustomerPhone?: string;
  orderCustomerMobile?: string;
  receiverName: string;
  receiverPhone: string;
  receiverMobile: string;
  deliveryDate: string;
  deliveryHours: string;
  deliveryMinutes?: string;
  deliveryType?: string;
  eventHours?: string;
  eventMinutes?: string;
  deliveryPlace: string;
  messages: { text: string }[];
  senderList: { name: string }[];
  options?: {
    [key: string]: {
      checked: boolean;
      price: number;
    };
  };
  card: string;
  request: string;
  hideDeliveryPhoto: boolean;
  productImage: File;
};
