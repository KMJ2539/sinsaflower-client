"use client";

import { useEffect, useState } from "react";
import Modal from "@/shared/components/ui/Modal";
import { OrderFormValue } from "../types/orderFormValue";
import { getOrderByNumber } from "../services/order.service";

interface ReceiptPrintModalProps {
  isOpen: boolean;
  orderNumber: string;
  onClose: () => void;
}

export default function ReceiptPrintModal({
  isOpen,
  orderNumber,
  onClose,
}: ReceiptPrintModalProps) {
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

  const getPrintStyles = () => `
    @media print {
      @page { size: A4; margin: 0.8cm; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      img { display: block !important; visibility: visible !important; opacity: 1 !important; }
    }
    body { font-family: Arial, sans-serif; margin: 0; padding: 15px; font-size: 10px; line-height: 1.2; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 9px; }
    td { border: 1px solid #d1d5db; padding: 6px; vertical-align: top; }
    .bg-gray-50 { background-color: #f9fafb; font-weight: bold; }
    .bg-yellow-50 { background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 4px; padding: 12px; }
    .border-b { border-bottom: 1px solid #e5e7eb; }
    .border-r { border-right: 1px solid #e5e7eb; }
    .border { border: 1px solid #d1d5db; border-radius: 6px; overflow: hidden; }
    .text-xs { font-size: 9px; line-height: 1.1; }
    .text-sm { font-size: 10px; line-height: 1.2; }
    .text-base { font-size: 11px; line-height: 1.3; }
    .text-lg { font-size: 12px; line-height: 1.3; }
    .font-medium { font-weight: 500; }
    .font-bold { font-weight: 700; }
    .text-gray-600 { color: #4b5563; }
    .text-gray-800 { color: #1f2937; }
    .text-red-600 { color: #dc2626; }
    .text-yellow-800 { color: #92400e; }
    .text-blue-600 { color: #2563eb; }
    .bg-blue-100 { background-color: #dbeafe; }
    .text-blue-800 { color: #1e40af; }
    .rounded { border-radius: 4px; }
    .px-2 { padding-left: 8px; padding-right: 8px; }
    .py-0\\.5 { padding-top: 2px; padding-bottom: 2px; }
    .mb-1 { margin-bottom: 4px; }
    .mb-2 { margin-bottom: 8px; }
    .mb-3 { margin-bottom: 12px; }
    .mt-3 { margin-top: 12px; }
    .my-3 { margin-top: 12px; margin-bottom: 12px; }
    .p-1 { padding: 4px; }
    .p-2 { padding: 8px; }
    .p-3 { padding: 12px; }
    .w-1\\/4 { width: 25%; }
    .w-3\\/4 { width: 75%; }
    .flex { display: flex; }
    .flex-1 { flex: 1 1 0%; }
    .items-center { align-items: center; }
    .justify-center { justify-content: center; }
    .justify-between { justify-content: space-between; }
    .text-left { text-align: left; }
    .text-center { text-align: center; }
    .gap-8 { gap: 32px; }
    .space-y-3 > * + * { margin-top: 12px; }
    .inline-block { display: inline-block; }
    .ml-2 { margin-left: 8px; }
    .border-t { border-top: 1px solid #9ca3af; }
    .border-dashed { border-top-style: dashed; }
    .border-gray-400 { border-top-color: #9ca3af; }
    .overflow-hidden { overflow: hidden; }
    .rounded-lg { border-radius: 8px; }
    img { max-width: 100%; height: auto; display: block; }
  `;

  const handlePrint = () => {
    const printContent = document.getElementById("print-content");
    if (printContent) {
      // 이미지를 Base64로 변환
      const logoImg = printContent.querySelector(
        'img[src="/images/logo_2.jpg"]'
      ) as HTMLImageElement;
      let logoBase64 = "";

      if (logoImg) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = logoImg.naturalWidth;
        canvas.height = logoImg.naturalHeight;
        ctx?.drawImage(logoImg, 0, 0);
        logoBase64 = canvas.toDataURL("image/jpeg");
      }

      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>인수증 출력</title>
              <style>${getPrintStyles()}</style>
            </head>
            <body>
              ${printContent.innerHTML.replace(
                /\/images\/logo_2\.jpg/g,
                logoBase64
              )}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      title=""
      size="xl"
      hasFooter={false}
      onCancel={onClose}
    >
      <div className="space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div id="print-content" className="bg-white p-3">
            {/* 주문서 섹션 */}
            <div className="mb-3">
              <div className="flex justify-between items-start mb-2">
                <div className="text-left">
                  <p className="text-xs text-gray-600">
                    주문번호: {orderNumber}
                  </p>
                  <p className="text-xs text-gray-600">
                    주문일시: 2025-08-09 11:24:31
                  </p>
                  <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                    [직접발주]
                  </span>
                </div>
                <div className="text-center flex-1">
                  <h2 className="text-2xl font-bold text-gray-800">주문서</h2>
                </div>
                <div className="text-right">
                  <img
                    src="/images/logo_2.jpg"
                    alt="신사플라워"
                    width={150}
                    height={40}
                    className="rounded"
                  />
                </div>
              </div>

              {/* 주문서 테이블 */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="w-1/4 bg-gray-50 p-1 font-medium border-r border-gray-200">
                        발주화원
                      </td>
                      <td className="w-3/4 p-1">
                        <div className="text-gray-600 text-xs">
                          플라워뱅크 전화: 010-9099-8422 휴대폰: 010-9099-8422
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="w-1/4 bg-gray-50 p-1 font-medium border-r border-gray-200">
                        수주화원
                      </td>
                      <td className="w-3/4 p-1">
                        <div className="text-gray-600 text-xs">
                          제이플라워 전화: 1800-0468 휴대폰: 010-9169-2151
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="w-1/4 bg-gray-50 p-1 font-medium border-r border-gray-200">
                        상품명
                      </td>
                      <td className="w-3/4 p-1">
                        {orderData?.productName || "근조화환 근조3"}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="w-1/4 bg-gray-50 p-1 font-medium border-r border-gray-200">
                        금액
                      </td>
                      <td className="w-3/4 p-1">
                        <div className="flex gap-8">
                          <span className="text-gray-600">
                            원청액: <span className="font-medium">0 원</span>
                          </span>
                          <span className="text-gray-600">
                            송금액:{" "}
                            <span className="font-medium">50,000 원</span>
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="w-1/4 bg-gray-50 p-1 font-medium border-r border-gray-200">
                        배달일시
                      </td>
                      <td className="w-3/4 p-1">25년 08월 09일 즉시</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="w-1/4 bg-gray-50 p-1 font-medium border-r border-gray-200">
                        배달장소
                      </td>
                      <td className="w-3/4 p-1">
                        [강원 속초시] 강원특별자치도 강릉시 강릉대로419번길 42
                        동인병원장례식장 3호실
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="w-1/4 bg-gray-50 p-1 font-medium border-r border-gray-200">
                        받는분
                      </td>
                      <td className="w-3/4 p-1">
                        <div className="text-gray-600 text-xs">
                          {orderData?.receiver || "이지원"} 전화: 휴대폰:
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="w-1/4 bg-gray-50 p-1 font-medium border-r border-gray-200">
                        요청 사항
                      </td>
                      <td className="w-3/4 p-1">현장사진부탁합니다</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="w-1/4 bg-gray-50 p-1 font-medium border-r border-gray-200">
                        경조사어
                      </td>
                      <td className="w-3/4 p-1">삼가 故人의 冥福을 빕니다</td>
                    </tr>
                    <tr>
                      <td className="w-1/4 bg-gray-50 p-1 font-medium border-r border-gray-200">
                        보내는 분
                      </td>
                      <td className="w-3/4 p-1">
                        전국자치단체공무직본부 서울지역지부
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 절취선 */}
            <div className="border-t border-dashed border-gray-400 mt-8 mb-2"></div>

            {/* 인수증 섹션 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="text-left">
                  <p className="text-xs text-gray-600">
                    주문번호: {orderNumber}
                  </p>
                  <p className="text-xs text-red-600 font-medium">
                    ※ 미확인 오배송 시 클레임처리 될 수 있습니다!!
                  </p>
                </div>
                <div className="text-center flex-1">
                  <h2 className="text-2xl font-bold text-gray-800">인수증</h2>
                </div>
                <div className="text-right">
                  <img
                    src="/images/logo_2.jpg"
                    alt="신사플라워"
                    width={150}
                    height={40}
                    className="rounded"
                  />
                </div>
              </div>

              {/* 인수증 테이블 */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="w-1/4 bg-gray-50 p-1 font-medium border-r border-gray-200">
                        발주화원
                      </td>
                      <td className="w-3/4 p-1">
                        <div className="text-gray-600 text-xs">
                          플라워뱅크 전화: 010-9099-8422 휴대폰: 010-9099-8422
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="w-1/4 bg-gray-50 p-1 font-medium border-r border-gray-200">
                        수주화원
                      </td>
                      <td className="w-3/4 p-1">
                        <div className="text-gray-600 text-xs">
                          제이플라워 전화: 1800-0468 휴대폰: 010-9169-2151
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="w-1/4 bg-gray-50 p-1 font-medium border-r border-gray-200">
                        상품명
                      </td>
                      <td className="w-3/4 p-1">
                        {orderData?.productName || "근조화환 근조3"}

                        <span className="ml-2">
                          <span className="text-gray-600">수량:</span>
                          <span className="ml-1 font-medium">1</span>
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="w-1/4 bg-gray-50 p-1 font-medium border-r border-gray-200">
                        배달일시
                      </td>
                      <td className="w-3/4 p-1">25년 08월 09일 즉시</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="w-1/4 bg-gray-50 p-1 font-medium border-r border-gray-200">
                        배달장소
                      </td>
                      <td className="w-3/4 p-1">
                        [강원 속초시] 강원특별자치도 강릉시 강릉대로419번길 42
                        동인병원장례식장 3호실
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="w-1/4 bg-gray-50 p-1 font-medium border-r border-gray-200">
                        받는분
                      </td>
                      <td className="w-3/4 p-1">
                        <div className="text-xs">
                          {orderData?.receiver || "이지원"}
                          <span className="ml-2 text-gray-600 ">
                            전화: 휴대폰:
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="w-1/4 bg-gray-50 p-1 font-medium border-r border-gray-200">
                        경조사어
                      </td>
                      <td className="w-3/4 p-1">삼가 故人의 冥福을 빕니다</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="w-1/4 bg-gray-50 p-1 font-medium border-r border-gray-200">
                        보내는 분
                      </td>
                      <td className="w-3/4 p-1">
                        전국자치단체공무직본부 서울지역지부
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="w-1/4 bg-gray-50 p-1 font-medium border-r border-gray-200">
                        요청 사항
                      </td>
                      <td className="w-3/4 p-1">현장사진부탁합니다</td>
                    </tr>
                    <tr>
                      <td className="w-1/4 bg-gray-50 p-1 font-medium border-r border-gray-200">
                        인수하신분
                      </td>
                      <td className="w-3/4 p-1">
                        <div className="flex gap-8">
                          <span className="text-gray-600">
                            이름: <span className="font-medium">박태근</span>
                          </span>
                          <span className="text-gray-600">
                            관계: <span className="font-medium">상주</span>
                          </span>
                          <span className="text-gray-600">
                            인수시간:{" "}
                            <span className="font-medium">12시 18분</span>
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 주의사항 */}
              <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800 mb-1">
                  [ 반드시 받는분이 맞는지 인수자에게 확인해주시고 배치해주세요.
                  ]
                </p>
                <p className="text-xs text-yellow-800">
                  ★ 주문서에 재사용 내용이 없을경우 모두 새꽃으로 제작해야 하며
                  이를 위반하여 문제가 발생 시 모든 법적 책임과 손해 배상은
                  수주화원에 있습니다.★
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 하단 버튼들 */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handlePrint}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm"
        >
          인쇄하기
        </button>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium text-sm"
        >
          닫기
        </button>
      </div>
    </Modal>
  );
}
