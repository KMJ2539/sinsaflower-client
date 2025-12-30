"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { OrderFormValue } from "../types/orderFormValue";

interface OrderInfoViewProps {
  orderNumber: string;
  orderData: Partial<OrderFormValue> | null;
  canUpload?: boolean;
  onClose?: () => void;
  onDeliveryEdit?: () => void;
  onDeliveryCancel?: () => void;
}

export default function OrderInfoView({ orderNumber, orderData, canUpload = false, onClose, onDeliveryEdit, onDeliveryCancel }: OrderInfoViewProps) {
  type OrderDetailExtra = {
    consignee?: string;
    consigneeTime?: string;
    consigneeRelation?: string;
    deliveryPhotos?: string[];
    salesRegion?: string;
    salesShopName?: string;
    salesPhone?: string;
    salesMobile?: string;
  };

  const extended = (orderData ?? {}) as Partial<OrderFormValue & OrderDetailExtra>;

  const deliveryDate = extended.deliveryDate || "-";
  const deliveryHours = extended.deliveryHours || "기본시간";
  const deliveryMinutes = extended.deliveryMinutes;
  const deliveryTimeLabel = deliveryHours === "기본시간" ? "기본시간" : `${deliveryHours}시${deliveryMinutes ? " " + deliveryMinutes + "분" : ""}`;

  const consigneeName = extended.consignee || "-";
  const consigneeTime = extended.consigneeTime || "-";
  const consigneeRelation = extended.consigneeRelation || "-";
  const consignMessage = extended.request || "-";

  const productName = extended.productName || "-";
  const payment = (extended.payment ?? 0).toLocaleString();
  const receiverName = extended.receiverName || "-";
  const deliveryPlace = extended.deliveryPlace || "-";
  const condolences = (extended.messages || [])
    .map((m) => m?.text)
    .filter(Boolean)
    .join(" / ") || "-";
  const senders = (extended.senderList || [])
    .map((s) => s?.name)
    .filter(Boolean)
    .join(", ") || "-";

  // 배송사진 업로드/보여주기 상태
  const initialPhotos = extended.deliveryPhotos;
  const [photos, setPhotos] = useState<string[]>(
    initialPhotos && initialPhotos.length > 0
      ? initialPhotos
      : ["/images/sample/flower_1.jpg", "/images/sample/flower_2.jpg"]
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    if (!canUpload) return;
    fileInputRef.current?.click();
  };

  const handleFileSelected = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const json = await res.json();
      if (json?.url) {
        setPhotos((prev) => [json.url, ...prev]);
      }
    } catch (err) {
      console.error("이미지 업로드 실패", err);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // 인수시간 입력 (YYYY-MM-DD, HH 24시)
  const [consigneeDate, setConsigneeDate] = useState<string>(consigneeTime !== "-" ? String(consigneeTime).split(" ")[0] : "");
  const [consigneeHour, setConsigneeHour] = useState<string>("14");
  const HOURS = Array.from({ length: 24 }, (_, i) => i);

  // 배달일시 입력 (YYYY-MM-DD, HH 24시)
  const [deliveryDateInput, setDeliveryDateInput] = useState<string>(deliveryDate !== "-" ? deliveryDate : "");
  const [deliveryHourInput, setDeliveryHourInput] = useState<string>(deliveryHours !== "기본시간" && deliveryHours !== "default" ? String(deliveryHours) : "14");

  return (
    <div className="space-y-4">
      {/* 상단 정보 */}
      <div className="text-xs text-gray-600">주문번호: {orderNumber}</div>

      {/* 인수자 */}
      <section className="border rounded-lg">
        <div className="bg-gray-50 px-3 py-2 font-semibold">인수자</div>
        <div className="p-3 space-y-3">
          {/* 배달장소/경조사어/보내는분 요약 */}
          <table className="w-full text-xs border border-gray-200">
            <tbody>
              <tr>
                <th className="w-28 bg-gray-50 border border-gray-200 p-1 text-left">배달장소</th>
                <td className="border border-gray-200 p-1">{deliveryPlace}</td>
              <tr>
                <th className="w-20 bg-gray-50 border border-gray-200 p-1 text-left">배달일시</th>
                <td className="border border-gray-200 p-1">
                  <div className="flex items-center gap-2">
                    <input type="date" value={deliveryDateInput} onChange={(e) => setDeliveryDateInput(e.target.value)} className="border p-0.5 text-xs" />
                    <select value={deliveryHourInput} onChange={(e) => setDeliveryHourInput(e.target.value)} className="border p-0.5 text-xs">
                      {HOURS.map((h) => (
                        <option key={h} value={String(h)}>{String(h).padStart(2, "0")}시</option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
              </tr>
              <tr>
                <th className="bg-gray-50 border border-gray-200 p-1 text-left">보내는분</th>
                <td className="border border-gray-200 p-1">{senders}</td>
              </tr>
            </tbody>
          </table>

          {/* 배송사진 썸네일 */}
          <div className="grid grid-cols-2 gap-3">
            {photos.slice(0, 2).map((url, idx) => (
              <div key={idx} className="border rounded-md p-1 flex items-center justify-center bg-white">
                <Image src={url} alt={`배송사진${idx + 1}`} width={220} height={140} className="rounded" />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleUploadClick}
              disabled={!canUpload}
              className={`px-3 py-1 rounded text-xs ${canUpload ? "bg-primary text-white hover:bg-accent" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
            >
              배송사진 등록
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelected}
            />
          </div>

          {/* 인수자 정보 표 */}
          <table className="w-full text-xs border border-gray-200">
            <tbody>
              <tr>
                <th className="w-28 bg-gray-50 border border-gray-200 p-1 text-left">인수자 등록일자</th>
                <td className="border border-gray-200 p-1">
                  <div className="flex items-center gap-2">
                    <input type="date" value={consigneeDate} onChange={(e) => setConsigneeDate(e.target.value)} className="border p-0.5 text-xs" />
                    <select value={consigneeHour} onChange={(e) => setConsigneeHour(e.target.value)} className="border p-0.5 text-xs">
                      {HOURS.map((h) => (
                        <option key={h} value={String(h)}>{String(h).padStart(2, "0")}시</option>
                      ))}
                    </select>
                  </div>
                </td>
                <th className="w-20 bg-gray-50 border border-gray-200 p-1 text-left">배달일시</th>
                <td className="border border-gray-200 p-1">{deliveryDate} {deliveryTimeLabel}</td>
              </tr>
              <tr>
                <th className="bg-gray-50 border border-gray-200 p-1 text-left">인수자</th>
                <td className="border border-gray-200 p-1">{consigneeName}</td>
                <th className="bg-gray-50 border border-gray-200 p-1 text-left">관계</th>
                <td className="border border-gray-200 p-1">{consigneeRelation}</td>
              </tr>
              <tr>
                <th className="bg-gray-50 border border-gray-200 p-1 text-left">전달메세지</th>
                <td className="border border-gray-200 p-1" colSpan={3}>{consignMessage}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 액션 버튼 */}
      <div className="flex justify-center gap-2 my-2">
        <button type="button" className="px-4 py-2 bg-gray-600 text-white rounded-md text-xs hover:bg-gray-700" onClick={onDeliveryEdit}>배송수정</button>
        <button type="button" className="px-4 py-2 bg-gray-600 text-white rounded-md text-xs hover:bg-gray-700" onClick={onDeliveryCancel}>배송취소</button>
        <button type="button" className="px-4 py-2 bg-gray-600 text-white rounded-md text-xs hover:bg-gray-700" onClick={onClose}>닫기</button>
      </div>

      {/* 수주내역 */}
      <section className="border rounded-lg">
        <div className="bg-gray-50 px-3 py-2 font-semibold">수주내역</div>
        <div className="p-3">
          <table className="w-full text-xs border border-gray-200">
            <tbody>
              <tr>
                <th className="w-32 bg-gray-50 border border-gray-200 p-1 text-left">발주화원정보</th>
                <td className="border border-gray-200 p-1">
                  지역: {extended.region || "-"} / 상호: {extended.shopName || "-"} / 전화: {extended.phone || "-"} / 휴대폰: {extended.phone || "-"}
                </td>
              </tr>
              <tr>
                <th className="bg-gray-50 border border-gray-200 p-1 text-left">수주화원정보</th>
                <td className="border border-gray-200 p-1">
                  지역: {extended.salesRegion || "-"} / 상호: {extended.salesShopName || "-"} / 전화: {extended.salesPhone || "-"} / 휴대폰: {extended.salesMobile || "-"}
                </td>
              </tr>
              <tr>
                <th className="w-28 bg-gray-50 border border-gray-200 p-1 text-left">상품명</th>
                <td className="border border-gray-200 p-1">{productName}</td>
              </tr>
              <tr>
                <th className="bg-gray-50 border border-gray-200 p-1 text-left">결제액</th>
                <td className="border border-gray-200 p-1">{payment}</td>
              </tr>
              <tr>
                <th className="bg-gray-50 border border-gray-200 p-1 text-left">배달일시</th>
                <td className="border border-gray-200 p-1">
                  <div className="flex items-center gap-2">
                    <input type="date" value={deliveryDateInput} onChange={(e) => setDeliveryDateInput(e.target.value)} className="border p-0.5 text-xs" />
                    <select value={deliveryHourInput} onChange={(e) => setDeliveryHourInput(e.target.value)} className="border p-0.5 text-xs">
                      {HOURS.map((h) => (
                        <option key={h} value={String(h)}>{String(h).padStart(2, "0")}시</option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <th className="bg-gray-50 border border-gray-200 p-1 text-left">받는고객명</th>
                <td className="border border-gray-200 p-1">{receiverName}</td>
              </tr>
              <tr>
                <th className="bg-gray-50 border border-gray-200 p-1 text-left">배달장소</th>
                <td className="border border-gray-200 p-1">{deliveryPlace}</td>
              </tr>
              <tr>
                <th className="bg-gray-50 border border-gray-200 p-1 text-left">경조사어</th>
                <td className="border border-gray-200 p-1">{condolences}</td>
              </tr>
              <tr>
                <th className="bg-gray-50 border border-gray-200 p-1 text-left">보내는분</th>
                <td className="border border-gray-200 p-1">{senders}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
