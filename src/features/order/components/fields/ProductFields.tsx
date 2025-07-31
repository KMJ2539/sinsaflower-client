import { useState } from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { OrderFormValues } from "../OrderForm";

interface Props {
  register: UseFormRegister<OrderFormValues>;
  setValue: UseFormSetValue<OrderFormValues>;
  watch: UseFormWatch<OrderFormValues>;
}

const products = [
  { code: "35", name: "축하3단" },
  { code: "39", name: "근조3단" },
  { code: "81", name: "축하3단(대)" },
  { code: "86", name: "근조3단(대)" },
  { code: "82", name: "축하3단(특대)" },
  { code: "87", name: "근조3단(특대)" },
  { code: "37", name: "축하4단" },
  { code: "92", name: "근조4단" },
  { code: "38", name: "축하5단" },
  { code: "97", name: "근조5단" },
  { code: "41", name: "근조 바구니" },
  { code: "83", name: "근조1단(스텐드)" },
  { code: "67", name: "근조2단(스텐드)" },
  { code: "72", name: "쌀화환" },
  { code: "04", name: "동양란" },
  { code: "12", name: "서양란" },
  { code: "05", name: "관엽식물" },
  { code: "02", name: "꽃바구니" },
  { code: "01", name: "꽃다발" },
  { code: "03", name: "꽃상자" },
  { code: "13", name: "비누꽃" },
  { code: "31", name: "분재" },
  { code: "08", name: "축하" },
  { code: "19", name: "축하오브제" },
  { code: "09", name: "근조오브제" },
  { code: "10", name: "기타" },
  { code: "11", name: "과일" },
  { code: "40", name: "근조2단" },
  { code: "73", name: "근조쌀화환" },
  { code: "33", name: "숯부작" },
  { code: "71", name: "동양란" },
  { code: "74", name: "축하원형화환" },
  { code: "75", name: "근조원형화환" },
];

const optionItems = [
  "케잌",
  "와인",
  "샴페인",
  "초코릿",
  "사탕",
  "빼빼로",
  "기타",
  "경조사비",
  "촛불분첨대",
  "배송비",
  "리본교체비",
];

export default function ProductFields({ register, setValue, watch }: Props) {
  const [showOptions, setShowOptions] = useState(false);

  // 상품 선택 시 상세상품명 자동 입력
  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue("productName", e.target.value);
    setValue("productDetail", e.target.value); // 상세상품명 자동 입력
  };

  // watch로 금액 계산
  const basePrice = watch("price") || 0;
  const optionValues = watch("options") || {};
  const optionTotal = Object.values(optionValues).reduce(
    (sum, val) => sum + (Number(val) || 0),
    0
  );

  // 결제액 계산
  const totalPayment = basePrice + optionTotal;
  setValue("payment", totalPayment);

  return (
    <>
      {/* 상품명 & 상세상품명 */}
      <tr>
        <th className="min-w-24 p-1 pl-2 border border-gray-300 bg-gray-50 text-left font-medium text-gray-900">
          상품명 <span className="text-red-500">*</span>
        </th>
        <td className="border border-gray-300 py-1 px-2">
          <select
            {...register("productName", { required: true })}
            onChange={(e) => {
              const selected = products.find((p) => p.code === e.target.value);
              setValue("productName", selected?.code || "");
              setValue("productDetail", selected?.name || "");
            }}
            className="border border-gray-300 rounded p-0.5 text-xs w-full"
          >
            <option value="">상품을 선택하세요</option>
            {products.map((p) => (
              <option key={p.code} value={p.code}>
                [{p.code}] {p.name}
              </option>
            ))}
          </select>
        </td>

        <th className="min-w-24 p-1 pl-2 border border-gray-300 bg-gray-50 text-left font-medium text-gray-900">
          상세상품명
        </th>
        <td className="border border-gray-300 py-1 px-2">
          <input
            {...register("productDetail")}
            className="border border-gray-300 rounded p-0.5 text-xs w-full"
          />
        </td>
      </tr>

      {/* 수량 & 원청금액 */}
      <tr>
        <th className="min-w-24 p-1 pl-2 border border-gray-300 bg-gray-50 text-left font-medium text-gray-900">
          수량 <span className="text-red-500">*</span>
        </th>
        <td className="border border-gray-300 py-1 px-2">
          <input
            type="number"
            {...register("quantity", { valueAsNumber: true })}
            className="border border-gray-300 rounded p-0.5 text-xs w-full"
            min={1}
          />
        </td>

        <th className="min-w-24 p-1 pl-2 border border-gray-300 bg-gray-50 text-left font-medium text-gray-900">
          원청금액
        </th>
        <td className="border border-gray-300 py-1 px-2">
          <input
            type="number"
            {...register("originPrice", { valueAsNumber: true })}
            className="border border-gray-300 rounded p-0.5 text-xs w-full"
          />
        </td>
      </tr>

      {/* 결제금액 */}
      <tr>
        <th className="min-w-24 p-1 pl-2 border border-gray-300 bg-gray-50 text-left font-medium text-gray-900">
          결제금액(옵션 제외)
        </th>
        <td className="border border-gray-300 py-1 px-2">
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
            className="border border-gray-300 rounded p-0.5 text-xs w-full"
          />
        </td>

        <th className="min-w-24 p-1 pl-2 border border-gray-300 bg-gray-50 text-left font-medium text-gray-900">
          옵션상품 보기
        </th>
        <td className="border border-gray-300 py-1 px-2">
          <input
            type="checkbox"
            checked={showOptions}
            onChange={() => setShowOptions((prev) => !prev)}
          />{" "}
          옵션상품 추가
        </td>
      </tr>

      {/* 옵션상품 목록 */}
      {showOptions && (
        <tr>
          <th className="min-w-24 p-1 pl-2 border border-gray-300 bg-gray-50 text-left font-medium text-gray-900 align-top">
            옵션상품
          </th>
          <td colSpan={3} className="border border-gray-300 py-1 px-2">
            <div className="grid grid-cols-2 gap-1">
              {optionItems.map((item) => (
                <label key={item} className="flex items-center gap-1">
                  <input type="checkbox" />
                  <input
                    type="number"
                    {...register(`options.${item}`, { valueAsNumber: true })}
                    className="border border-gray-300 rounded p-0.5 text-xs w-16"
                    placeholder="0"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </td>
        </tr>
      )}

      {/* 결제액 */}
      <tr>
        <th className="min-w-24 p-1 pl-2 border border-gray-300 bg-gray-50 text-left font-medium text-gray-900">
          결제액(옵션 포함)
        </th>
        <td colSpan={3} className="border border-gray-300 py-1 px-2">
          <input
            type="number"
            {...register("payment")}
            value={totalPayment}
            readOnly
            className="border border-gray-300 rounded p-0.5 text-xs w-full bg-gray-100"
          />
        </td>
      </tr>
    </>
  );
}
