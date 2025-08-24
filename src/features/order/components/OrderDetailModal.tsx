"use client";

import { useEffect, useState } from "react";
import Modal from "@/shared/components/ui/Modal";
import OrderForm from "./form/OrderForm";
import { OrderFormValue } from "../types/orderFormValue";
import { getOrderByNumber } from "../services/order.service";

interface OrderDetailModalProps {
  isOpen: boolean;
  orderNumber: string;
  onClose: () => void;
}

export default function OrderDetailModal({
  isOpen,
  orderNumber,
  onClose,
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
      size="xl"
      hasFooter={true}
      confirmText="수정"
      cancelText="닫기"
      onCancel={onClose}
      onConfirm={handleModify}
    >
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* OrderForm을 주문정보 조회용으로 사용 */}
            <OrderForm
              mode="view"
              initialData={orderData}
              orderNumber={orderNumber}
            />

            {/* 하단 버튼들 */}
            <div className="flex gap-4 justify-center  pb-4 border-gray-200">
              <button
                onClick={handleDeliveryProcess}
                className="px-5 py-2.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors font-medium text-sm shadow-sm"
              >
                배송처리
              </button>
              <button
                onClick={handleDeleteOrder}
                className="px-5 py-2.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors font-medium text-sm shadow-sm"
              >
                주문서 삭제
              </button>
              <button
                onClick={handlePrintReceipt}
                className="px-5 py-2.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors font-medium text-sm shadow-sm"
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
