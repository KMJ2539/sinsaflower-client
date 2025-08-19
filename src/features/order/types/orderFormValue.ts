export type OrderFormValue = {
  specialNote?: string;
  region: string;
  shopName: string;
  phone: string;
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
