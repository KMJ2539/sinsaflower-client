import { UseFormRegister } from "react-hook-form";
import { OrderFormValues } from "../OrderForm";

interface Props {
  register: UseFormRegister<OrderFormValues>;
}

export default function DeliveryFields({ register }: Props) {
  return (
    <>
      {/* 배송사진 비공개 */}
      <tr>
        <th>배송사진 비공개</th>
        <td colSpan={3}>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("hideDeliveryPhoto")} />
            비공개
          </label>
        </td>
      </tr>

      {/* 주문고객/받는고객 */}
      <tr>
        <th>주문고객명</th>
        <td>
          <input
            {...register("orderCustomerName")}
            className="border p-0.5 text-xs w-full"
          />
        </td>
        <th>
          받는고객명 <span className="text-red-500">*</span>
        </th>
        <td>
          <input
            {...register("receiverName", { required: true })}
            className="border p-0.5 text-xs w-full"
          />
        </td>
      </tr>

      {/* 전화번호 */}
      <tr>
        <th>주문고객전화</th>
        <td>
          <input
            {...register("orderCustomerPhone")}
            className="border p-0.5 text-xs w-full"
          />
        </td>
        <th>
          받는고객전화 <span className="text-red-500">*</span>
        </th>
        <td>
          <input
            {...register("receiverPhone", { required: true })}
            className="border p-0.5 text-xs w-full"
          />
        </td>
      </tr>

      {/* 핸드폰 */}
      <tr>
        <th>주문고객핸드폰</th>
        <td>
          <input
            {...register("orderCustomerMobile")}
            className="border p-0.5 text-xs w-full"
          />
        </td>
        <th>
          받는고객핸드폰 <span className="text-red-500">*</span>
        </th>
        <td>
          <input
            {...register("receiverMobile", { required: true })}
            className="border p-0.5 text-xs w-full"
          />
        </td>
      </tr>

      {/* 배달일시 */}
      <tr>
        <th>
          배달일시 <span className="text-red-500">*</span>
        </th>
        <td colSpan={3}>
          <input
            type="date"
            {...register("deliveryDate", { required: true })}
            className="border p-0.5 text-xs"
          />
          <select
            {...register("deliveryTime")}
            className="border p-0.5 text-xs ml-2"
          >
            <option value="기본시간">기본시간</option>
            <option value="오전">오전</option>
            <option value="오후">오후</option>
          </select>
        </td>
      </tr>

      {/* 배달장소 */}
      <tr>
        <th>
          배달장소 <span className="text-red-500">*</span>
        </th>
        <td colSpan={3}>
          <div className="flex gap-2">
            <input
              {...register("deliveryPlace", { required: true })}
              className="border p-0.5 text-xs w-1/2"
            />
            <button type="button" className="btn-md">
              행사장 검색
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
