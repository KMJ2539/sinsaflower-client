import { useState } from "react";
import {
  Control,
  Controller,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { OrderFormValue } from "../../types/orderFormValue";

interface Props {
  register: UseFormRegister<OrderFormValue>;
  setValue: UseFormSetValue<OrderFormValue>;
  watch: UseFormWatch<OrderFormValue>;
  control: Control<OrderFormValue>;
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

export default function ProductFields({
  register,
  setValue,
  watch,
  control,
}: Props) {
  const options = watch("options") || {};
  const basePrice = watch("price") || 0;
  const [showOptions, setShowOptions] = useState(false);

  // 상품 선택 시 상세상품명 자동 입력
  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = products.find((p) => p.code === e.target.value);
    setValue("productName", selected?.code || "");
    setValue("productDetail", selected?.name || "");
  };

  // 결제금액 합산(옵션 포함)
  const calculatePayment = (newPrice?: number) => {
    const price = newPrice ?? watch("price") ?? 0;
    const currentOptions = watch("options") || {};

    let optionTotal = 0;
    Object.values(currentOptions).forEach((opt) => {
      if (opt?.checked) {
        optionTotal += Number(opt.price) || 0;
      }
    });

    setValue("payment", price + optionTotal);
  };

  // 원청금액 클릭이벤트
  const plusOriginPrice = (num: number) => {
    setValue("originPrice", watch("originPrice") + num);
  };

  //결제금액 클릭이벤트
  const plusPrice = (num: number) => {
    setValue("price", watch("price") + num);
    calculatePayment();
  };

  return (
    <>
      {/* 상품명 & 상세상품명 */}
      <tr>
        <th>
          상품명 <span className="text-red-500">*</span>
        </th>
        <td colSpan={3}>
          <div className="flex gap-3">
            <select
              {...register("productName", { required: true })}
              onChange={(e) => {
                handleProductChange(e);
              }}
              className="border border-gray-300 rounded p-0.5 text-xs w-30"
            >
              <option value="">상품을 선택하세요</option>
              {products.map((p) => (
                <option key={p.code} value={p.code}>
                  [{p.code}] {p.name}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-1">
              <p>상세상품명</p>
              <input
                {...register("productDetail")}
                className="border border-gray-300 rounded p-0.5 text-xs w-30"
              />
            </div>
            <div className="flex items-center gap-1">
              <p>
                수량<span className="sf-req">*</span>
              </p>
              <input
                type="number"
                {...register("quantity", { valueAsNumber: true })}
                className="border border-gray-300 rounded p-0.5 text-xs w-12"
                min={1}
              />
            </div>
          </div>
        </td>
      </tr>

      {/* 수량 & 원청금액 */}
      <tr>
        <th>원청금액</th>
        <td colSpan={3}>
          <input
            type="number"
            {...register("originPrice", { valueAsNumber: true })}
            className="border border-gray-300 rounded p-0.5 text-xs w-28 mr-1"
          />
          <button
            type="button"
            className="sf-btn-img--sm"
            onClick={() => plusOriginPrice(10000)}
          >
            <span className="sf-btn-price__currency">₩</span>
            <span className="sf-btn-price__amount">1만</span>
          </button>
          <button
            type="button"
            className="sf-btn-img--sm"
            onClick={() => plusOriginPrice(60000)}
          >
            <span className="sf-btn-price__currency">₩</span>
            <span className="sf-btn-price__amount">6만</span>
          </button>
          <button
            type="button"
            className="sf-btn-img--sm"
            onClick={() => plusOriginPrice(70000)}
          >
            <span className="sf-btn-price__currency">₩</span>
            <span className="sf-btn-price__amount">7만</span>
          </button>
          <button
            type="button"
            className="sf-btn-img--sm"
            onClick={() => plusOriginPrice(80000)}
          >
            <span className="sf-btn-price__currency">₩</span>
            <span className="sf-btn-price__amount">8만</span>
          </button>
        </td>
      </tr>

      {/* 결제금액 */}
      <tr>
        <th>결제금액(옵션 제외)</th>
        <td colSpan={3}>
          <div className="flex gap-2">
            <div>
              <input
                type="number"
                {...register("price", { valueAsNumber: true })}
                onChange={(e) => {
                  const value = Number(e.target.value) || 0;
                  setValue("price", value);
                  calculatePayment(value); // price 입력 시 즉시 계산
                }}
                className="border border-gray-300 rounded p-0.5 text-xs w-28 mr-1"
              />
              <button
                type="button"
                className="sf-btn-img--sm"
                onClick={() => plusPrice(10000)}
              >
                <span className="sf-btn-price__currency">₩</span>
                <span className="sf-btn-price__amount">1만</span>
              </button>
              <button
                type="button"
                className="sf-btn-img--sm"
                onClick={() => plusPrice(60000)}
              >
                <span className="sf-btn-price__currency">₩</span>
                <span className="sf-btn-price__amount">6만</span>
              </button>
              <button
                type="button"
                className="sf-btn-img--sm"
                onClick={() => plusPrice(70000)}
              >
                <span className="sf-btn-price__currency">₩</span>
                <span className="sf-btn-price__amount">7만</span>
              </button>
              <button
                type="button"
                className="sf-btn-img--sm"
                onClick={() => plusPrice(80000)}
              >
                <span className="sf-btn-price__currency">₩</span>
                <span className="sf-btn-price__amount">8만</span>
              </button>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <input
                type="checkbox"
                checked={showOptions}
                onChange={() => {
                  setShowOptions((prev) => !prev);
                  calculatePayment();
                }}
              />
              <label>옵션상품 추가</label>
            </div>
          </div>
        </td>
      </tr>

      {/* 옵션상품 목록 */}
      {showOptions && (
        <tr>
          <th>옵션상품</th>
          <td colSpan={3}>
            <div className="grid grid-cols-2 gap-1">
              {optionItems.map((item) => (
                <label key={item} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      setValue(`options.${item}.checked`, e.target.checked);
                      calculatePayment(); // 체크박스 클릭 시 계산
                    }}
                  />
                  <input
                    type="number"
                    {...register(`options.${item}.price`, {
                      valueAsNumber: true,
                    })}
                    onChange={(e) => {
                      setValue(
                        `options.${item}.price`,
                        Number(e.target.value) || 0
                      );
                      calculatePayment(); // 옵션 금액 입력 시 계산
                    }}
                    className="border border-gray-300 rounded p-0.5 text-xs w-16"
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
        <th>결제액(옵션 포함)</th>
        <td colSpan={3}>
          <input
            type="number"
            {...register("payment")}
            readOnly
            className="border border-gray-300 rounded p-0.5 text-xs w-full bg-gray-100"
          />
        </td>
      </tr>

      <tr>
        <th>상품이미지</th>
        <td colSpan={3}>
          <div className="flex gap-1">
            {/* <button className="sf-btn-img--md">이미지검색</button> */}
            <Controller
              control={control}
              name="productImage"
              render={({ field }) => (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    field.onChange(file);
                  }}
                />
              )}
            />
          </div>
        </td>
      </tr>
    </>
  );
}
