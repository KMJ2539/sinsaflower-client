import { UseFormRegister } from "react-hook-form";
import { OrderFormValue } from "../../types/orderFormValue";

interface Props {
  register: UseFormRegister<OrderFormValue>;
  disabled?: boolean;
}

export default function BasicInfoFields({ register, disabled = false }: Props) {
  return (
    <>
      {/* 당일 배송 특이사항 / 배송상태 */}
      <tr>
        <th>{disabled ? "배송상태" : "당일 배송 특이사항"}</th>
        <td colSpan={3}>
          {disabled ? (
            <div className="flex items-center">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-md font-medium">
                배송완료
              </span>
            </div>
          ) : (
            <div className="flex items-center">
              <input
                {...register("specialNote")}
                className="border border-gray-300 rounded p-0.5 text-xs w-full resize-none focus:ring-1 focus:ring-primary/20 focus:border-primary transition-all"
                disabled
              />
            </div>
          )}
        </td>
      </tr>

      {/* 수주화원 */}
      <tr>
        <th>수주화원{!disabled && <span className="sf-req">*</span>}</th>
        <td colSpan={3} className="py-1 px-2">
          <p className="flex gap-1">
            <input
              {...register("region")}
              disabled
              className="border border-gray-300 rounded p-0.5 w-20 focus:ring-1 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="지역"
            />
            <input
              {...register("shopName")}
              disabled
              className="border border-gray-300 rounded p-0.5 w-20 focus:ring-1 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="화원명"
            />
            <input
              {...register("phone")}
              disabled
              className="border border-gray-300 rounded p-0.5 w-20 focus:ring-1 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="전화번호"
            />

            <button
              type="button"
              className="sf-btn-img--md"
              disabled={disabled}
            >
              화원검색
            </button>
          </p>
        </td>
      </tr>
    </>
  );
}
