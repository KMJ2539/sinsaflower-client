import { UseFormRegister } from "react-hook-form";
import { OrderFormValues } from "../OrderForm";

interface Props {
  register: UseFormRegister<OrderFormValues>;
}

export default function BasicInfoFields({ register }: Props) {
  return (
    <>
      {/* 당일 배송 특이사항 */}
      <tr className="border-b">
        <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50 align-middle">
          당일 배송 특이사항
        </th>
        <td colSpan={3} className="py-1 px-2 align-middle">
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
      <tr className="border-b">
        <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
          수주화원 <span className="text-red-500">*</span>
        </th>
        <td colSpan={3} className="py-1 px-2">
          <p>
            <input
              {...register("florist", { required: true })}
              className="border border-gray-300 rounded p-0.5 text-xs w-full"
              placeholder="수주화원 이름"
            />
          </p>
        </td>
      </tr>

      {/* 지역 / 화원명 */}
      <tr className="border-b">
        <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
          지역
        </th>
        <td className="py-1 px-2">
          <p>
            <input
              {...register("region")}
              className="border border-gray-300 rounded p-0.5 text-xs w-full"
              placeholder="지역"
            />
          </p>
        </td>

        <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
          화원명
        </th>
        <td className="py-1 px-2">
          <p>
            <input
              {...register("shopName")}
              className="border border-gray-300 rounded p-0.5 text-xs w-full"
              placeholder="화원명"
            />
          </p>
        </td>
      </tr>

      {/* 전화번호 */}
      <tr className="border-b">
        <th className="min-w-24 p-1 pl-2 border-x text-left font-medium text-gray-900 bg-gray-50">
          전화번호
        </th>
        <td colSpan={3} className="py-1 px-2">
          <p>
            <input
              {...register("phone")}
              className="border border-gray-300 rounded p-0.5 text-xs w-full"
              placeholder="전화번호"
            />
          </p>
        </td>
      </tr>
    </>
  );
}
