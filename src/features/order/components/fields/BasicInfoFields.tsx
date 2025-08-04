import { UseFormRegister } from "react-hook-form";
import { OrderFormValues } from "../OrderForm";

interface Props {
  register: UseFormRegister<OrderFormValues>;
}

export default function BasicInfoFields({ register }: Props) {
  return (
    <>
      {/* 당일 배송 특이사항 */}
      <tr>
        <th>당일 배송 특이사항</th>
        <td colSpan={3}>
          <div className="flex items-center">
            <input
              {...register("specialNote")}
              className="border border-gray-300 rounded p-0.5 text-xs w-full resize-none"
              disabled
            />
          </div>
        </td>
      </tr>

      {/* 수주화원 */}
      <tr>
        <th>
          수주화원 <span className="text-red-500">*</span>
        </th>
        <td colSpan={3} className="py-1 px-2">
          <p className="flex gap-1">
            <input
              {...register("region")}
              disabled
              className="border border-gray-300 rounded p-0.5 w-20"
              placeholder="지역"
            />
            <input
              {...register("shopName")}
              disabled
              className="border border-gray-300 rounded p-0.5 w-20"
              placeholder="화원명"
            />
            <input
              {...register("phone")}
              disabled
              className="border border-gray-300 rounded p-0.5 w-20"
              placeholder="전화번호"
            />

            <button
              type="button"
              className="py-0.5 rounded text-xs w-[70px] text-center"
              style={{
                background: 'url("/images/btn_70.png") no-repeat',
              }}
            >
              화원검색
            </button>
          </p>
        </td>
      </tr>
    </>
  );
}
