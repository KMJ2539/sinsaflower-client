"use client";

import { useForm } from "react-hook-form";
import BasicInfoFields from "../fields/BasicInfoFields";
import ProductFields from "../fields/ProductFields";
import DeliveryFields from "../fields/DeliveryFields";
import MessageFields from "../fields/MessageFields";
import AdditionalInfoFields from "../fields/AdditionalInfoFields";
import { OrderFormValues } from "../../types/orderFormValues";

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
      <table className="sf-table sf-table--form">
        <tbody>
          <BasicInfoFields register={register} />
          <ProductFields
            register={register}
            setValue={setValue}
            watch={watch}
            control={control}
          />
          <DeliveryFields register={register} watch={watch} />
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
        <button type="submit" className="sf-btn sf-btn--primary sf-btn--md">
          발주하기
        </button>
        <button
          type="button"
          className="sf-btn sf-btn--secondary sf-btn--md"
          onClick={() => alert("미리보기")}
        >
          미리보기
        </button>
      </div>
    </form>
  );
};

export default OrderForm;
