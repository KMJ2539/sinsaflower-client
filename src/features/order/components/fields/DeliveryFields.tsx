import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { OrderFormValue } from "../../types/orderFormValue";

interface Props {
  register: UseFormRegister<OrderFormValue>;
  watch: UseFormWatch<OrderFormValue>;
  disabled?: boolean;
}

export default function DeliveryFields({
  register,
  watch,
  disabled = false,
}: Props) {
  const HOURS = Array.from({ length: 16 }, (_, i) => i + 8); // 8 ~ 23
  const MINUTES = [0, 10, 20, 30, 40, 50];
  const deliveryHours = watch("deliveryHours");
  const needDetail = deliveryHours && deliveryHours !== "default";

  return (
    <>
      {/* 배송사진 비공개 */}
      <tr>
        <th>배송사진 비공개</th>
        <td colSpan={3}>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("hideDeliveryPhoto")}
              disabled={disabled}
            />
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
            disabled={disabled}
          />
        </td>
        <th>
          받는고객명 <span className="text-red-500">*</span>
        </th>
        <td>
          <input
            {...register("receiverName", { required: true })}
            className="border p-0.5 text-xs w-full"
            disabled={disabled}
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
            disabled={disabled}
          />
        </td>
        <th>
          받는고객전화 <span className="text-red-500">*</span>
        </th>
        <td>
          <input
            {...register("receiverPhone", { required: true })}
            className="border p-0.5 text-xs w-full"
            disabled={disabled}
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
            disabled={disabled}
          />
        </td>
        <th>
          받는고객핸드폰 <span className="text-red-500">*</span>
        </th>
        <td>
          <input
            {...register("receiverMobile", { required: true })}
            className="border p-0.5 text-xs w-full"
            disabled={disabled}
          />
        </td>
      </tr>

      {/* 배달일시 */}
      <tr>
        <th>배달일시{!disabled && <span className="sf-req">*</span>}</th>
        <td colSpan={3}>
          <input
            type="date"
            {...register("deliveryDate", { required: true })}
            className="border p-0.5 text-xs"
            disabled={disabled}
          />
          <select
            {...register("deliveryHours")}
            className="border p-0.5 text-xs ml-2"
            disabled={disabled}
          >
            <option value="default">기본시간</option>
            {HOURS.map((h) => (
              <option key={h} value={String(h)}>
                {h}시
              </option>
            ))}
          </select>

          {/* 기본시간이 아닌 경우: 디테일 영역 */}
          {needDetail && (
            <div className="inline-flex items-center gap-2 ml-2">
              <select
                {...register("deliveryMinutes", {
                  required: needDetail,
                  valueAsNumber: true,
                })}
                className="border p-0.5 text-xs"
                defaultValue={0}
                disabled={disabled}
              >
                {MINUTES.map((m) => (
                  <option key={m} value={m}>
                    {String(m).padStart(2, "0")}분
                  </option>
                ))}
              </select>
              <select
                {...register("deliveryType")}
                className="border p-0.5"
                disabled={disabled}
              >
                <option value="까지">까지</option>
                <option value="예식">예식</option>
                <option value="행사">행사</option>
              </select>

              <span className="ml-2">행사시간:</span>
              <select
                {...register("eventHours", { valueAsNumber: true })}
                className="border p-0.5 text-xs"
                defaultValue={0}
                disabled={disabled}
              >
                {HOURS.map((h) => (
                  <option key={h} value={h}>
                    {h}시
                  </option>
                ))}
              </select>
              <select
                {...register("eventMinutes", { valueAsNumber: true })}
                className="border p-0.5 text-xs"
                defaultValue={0}
                disabled={disabled}
              >
                {MINUTES.map((m) => (
                  <option key={m} value={m}>
                    {m}분
                  </option>
                ))}
              </select>
            </div>
          )}
        </td>
      </tr>

      {/* 배달장소 */}
      <tr>
        <th>배달장소{!disabled && <span className="sf-req">*</span>}</th>
        <td colSpan={3}>
          <div className="flex gap-2">
            <input
              {...register("deliveryPlace", { required: true })}
              className="border p-0.5 text-xs w-1/2"
              disabled={disabled}
            />
            <button
              type="button"
              className="sf-btn-img--md"
              disabled={disabled}
            >
              행사장 검색
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
