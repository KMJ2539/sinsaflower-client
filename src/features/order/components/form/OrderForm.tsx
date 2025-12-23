"use client";

import { useForm } from "react-hook-form";
import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BasicInfoFields from "../fields/BasicInfoFields";
import ProductFields from "../fields/ProductFields";
import DeliveryFields from "../fields/DeliveryFields";
import MessageFields from "../fields/MessageFields";
import AdditionalInfoFields from "../fields/AdditionalInfoFields";
import { OrderFormValue } from "../../types/orderFormValue";
import MemberSearchModal from "@/features/members/components/MemberSearchModal";

interface OrderFormProps {
  mode?: "create" | "view";
  initialData?: Partial<OrderFormValue>;
  orderNumber?: string;
}

const OrderForm = ({
  mode = "create",
  initialData,
  orderNumber,
}: OrderFormProps) => {
  const isViewMode = mode === "view";

  const { register, handleSubmit, setValue, watch, control, getValues } =
    useForm<OrderFormValue>({
      defaultValues: {
        orderType: "",
        autoSido: "",
        autoSigungu: "",
        originPrice: 0,
        price: 0,
        payment: 0,
        quantity: 1,
        senderList: [{}],
        messages: [{}],
        ...initialData,
      },
    });

  const [isMemberSearchOpen, setIsMemberSearchOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const floristId = searchParams.get("floristId");
    const shopName = searchParams.get("shopName");
    const phone = searchParams.get("phone");
    const region = searchParams.get("region");
    const orderTypeParam = searchParams.get("orderType");
    if (floristId || shopName || phone || region) {
      setValue("receiverShopId", floristId ?? "");
      setValue("shopName", shopName ?? "");
      setValue("phone", phone ?? "");
      setValue("region", region ?? "");
      // If coming from member selection, default to '회원 선택 발주'
      if (orderTypeParam === "member" || floristId || shopName) {
        setValue("orderType", "member");
        // Clear auto-assignment fields when selecting member flow
        setValue("autoSido", "");
        setValue("autoSigungu", "");
      }
    }
  }, [searchParams, setValue]);

  const handleSelectMember = useCallback(
    (shop: { shopId?: string; shopName: string; region: string; phone?: string }) => {
      setValue("receiverShopId", shop.shopId ?? "");
      setValue("region", shop.region ?? "");
      setValue("shopName", shop.shopName ?? "");
      setValue("phone", shop.phone ?? "");
      setIsMemberSearchOpen(false);
    },
    [setValue]
  );

  const onSubmit = (data: OrderFormValue) => {
    if (isViewMode) return;
    console.log("폼 제출:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isViewMode && (
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800">주문정보</h2>
          {orderNumber && (
            <p className="text-sm text-gray-600 mt-1">
              주문번호: {orderNumber}
            </p>
          )}
        </div>
      )}

      <table className="sf-table sf-table--form">
        <tbody>
          <BasicInfoFields
            register={register}
            watch={watch}
            setValue={setValue}
            disabled={isViewMode}
            onOpenMemberSearch={() => setIsMemberSearchOpen(true)}
          />
          <ProductFields
            register={register}
            setValue={setValue}
            watch={watch}
            control={control}
            disabled={isViewMode}
          />
          <DeliveryFields
            register={register}
            watch={watch}
            disabled={isViewMode}
          />
          <MessageFields
            register={register}
            control={control}
            setValue={setValue}
            getValues={getValues}
            disabled={isViewMode}
          />
          <AdditionalInfoFields
            register={register}
            control={control}
            disabled={isViewMode}
          />
        </tbody>
      </table>

      {!isViewMode && (
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
      )}

      {isMemberSearchOpen && (
        <MemberSearchModal
          open={isMemberSearchOpen}
          onClose={() => setIsMemberSearchOpen(false)}
          onSelectMember={handleSelectMember}
        />
      )}
    </form>
  );
};

export default OrderForm;
