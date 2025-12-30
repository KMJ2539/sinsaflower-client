"use client";

import { useEffect, useState } from "react";
import Modal from "@/shared/components/ui/Modal";
import OrderForm from "./form/OrderForm";
import { OrderFormValue } from "../types/orderFormValue";
import { getOrderByNumber } from "../services/order.service";
import OrderInfoView from "./OrderInfoView";

interface OrderDetailModalProps {
  isOpen: boolean;
  orderNumber: string;
  onClose: () => void;
  focusSection?: "consignee" | "top";
}

export default function OrderDetailModal({
  isOpen,
  orderNumber,
  onClose,
  focusSection,
}: OrderDetailModalProps) {
  const [orderData, setOrderData] = useState<OrderFormValue | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && orderNumber) {
      fetchOrderData();
    }
  }, [isOpen, orderNumber]);

  const fetchOrderData = async () => {
    try {
      setIsLoading(true);
      const data = await getOrderByNumber(orderNumber);
      setOrderData(data);
    } catch (error) {
      console.error("주문 조회 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModify = async () => {
    // 수정 로직 구현
    console.log("수정:", orderData);
  };

  const handleDeliveryProcess = () => {
    // 배송처리 로직 구현
    console.log("배송처리");
  };

  const handleDeleteOrder = () => {
    // 주문서 삭제 로직 구현
    console.log("주문서 삭제");
  };

  const handlePrintReceipt = () => {
    // 인수증 출력 로직 구현
    console.log("인수증 출력");
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      title=""
      size="md"
      hasFooter={true}
      cancelText="닫기"
      onCancel={onClose}
    >
      <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {focusSection === "consignee" ? (
              <OrderInfoView
                orderNumber={orderNumber}
                orderData={orderData}
                canUpload={false}
                onClose={onClose}
                onDeliveryEdit={() => console.log("배송수정")}
                onDeliveryCancel={() => console.log("배송취소")}
              />
            ) : (
              <OrderForm
                mode="view"
                initialData={orderData}
                orderNumber={orderNumber}
                focusSection={focusSection}
              />
            )}

            {/* 하단 버튼들 */}
            <div className="flex gap-2 justify-center pb-2">
              <button
                onClick={handleDeliveryProcess}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors font-medium text-sm shadow-sm"
              >
                배송처리
              </button>
              <button
                onClick={handlePrintReceipt}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors font-medium text-sm shadow-sm"
              >
                인수증 출력
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
