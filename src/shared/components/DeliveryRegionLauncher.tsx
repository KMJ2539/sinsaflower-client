"use client";

import React, { useRef, useState } from "react";
import DeliveryRegionPopup from "./DeliveryRegionPopup";

export default function DeliveryRegionLauncher() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // close when clicking outside
  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (!open) return;
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setOpen((s) => !s)}
        className="font-medium text-gray-700 hover:text-primary hover:scale-105 transition-all duration-200 cursor-pointer"
      >
        배송지역 설정
      </button>
      {open && <DeliveryRegionPopup onClose={() => setOpen(false)} />}
    </div>
  );
}
