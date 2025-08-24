"use client";

import { useState } from "react";
import Image from "next/image";
import OrderDetailModal from "../OrderDetailModal";
import ReceiptPrintModal from "../ReceiptPrintModal";

interface OrderNumberCellProps {
  orderNumber: string;
}

export default function OrderNumberCell({ orderNumber }: OrderNumberCellProps) {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  const handleOrderNumberClick = () => {
    setIsDetailModalOpen(true);
  };

  const handleReceiptIconClick = () => {
    setIsReceiptModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  const handleCloseReceiptModal = () => {
    setIsReceiptModalOpen(false);
  };

  return (
    <>
      <td>
        <div
          className="text-primary font-semibold underline cursor-pointer hover:text-accent transition-colors text-sm"
          onClick={handleOrderNumberClick}
        >
          {orderNumber}
        </div>
        <Image
          src="/icons/icon_08.png"
          alt="insu"
          width={10}
          height={10}
          className="cursor-pointer m-auto pt-1"
          onClick={handleReceiptIconClick}
        />
      </td>

      <OrderDetailModal
        isOpen={isDetailModalOpen}
        orderNumber={orderNumber}
        onClose={handleCloseDetailModal}
      />

      <ReceiptPrintModal
        isOpen={isReceiptModalOpen}
        orderNumber={orderNumber}
        onClose={handleCloseReceiptModal}
      />
    </>
  );
}
