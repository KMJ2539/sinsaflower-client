"use client";

import { Button } from "@/shared/components/ui/Button";
import { useForm } from "react-hook-form";
import BasicInfoFields from "../fields/BasicInfoFields";
import ProductFields from "../fields/ProductFields";
import "@/shared/styles/formTable.css";
import DeliveryFields from "../fields/DeliveryFields";
import MessageFields from "../fields/MessageFields";
import AdditionalInfoFields from "../fields/AdditionalInfoFields";

export type OrderFormValues = {
  specialNote?: string;
  florist: string;
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
  deliveryTime: string;
  deliveryPlace: string;
  messages: { text: string }[];
  senderList: { name: string; card?: string; note?: string }[];
  options?: {
    [key: string]: {
      checked: boolean;
      price: number;
    };
  };
  card: string;
  request: string;
  hideDeliveryPhoto: boolean;
};

const OrderForm = () => {
  const { register, handleSubmit, setValue, watch, control, getValues } =
    useForm<OrderFormValues>({
      defaultValues: {
        originPrice: 0,
        price: 0,
        payment: 0,
        quantity: 1,
        senderList: [{}],
        messages: [{}],
      },
    });

  const onSubmit = (data: OrderFormValues) => {
    console.log("폼 제출:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <table className="form-table">
        <tbody>
          <BasicInfoFields register={register} />
          <ProductFields
            register={register}
            setValue={setValue}
            watch={watch}
          />
          <DeliveryFields register={register} />
          <MessageFields
            register={register}
            control={control}
            setValue={setValue}
            getValues={getValues}
          />
          <AdditionalInfoFields register={register} control={control} />
        </tbody>
      </table>

      <div className="w-full m-auto flex gap-3 text-sm justify-center my-6">
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded font-medium hover:shadow-md transition-all duration-200"
        >
          발주하기
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded font-medium hover:bg-gray-200 transition-all duration-200"
          onClick={() => alert("미리보기")}
        >
          미리보기
        </button>
      </div>
    </form>
  );
};

export default OrderForm;
