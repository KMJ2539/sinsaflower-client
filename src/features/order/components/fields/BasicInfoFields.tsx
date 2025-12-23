import { UseFormRegister, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { OrderFormValue } from "../../types/orderFormValue";

interface Props {
  register: UseFormRegister<OrderFormValue>;
  watch: UseFormWatch<OrderFormValue>;
  setValue: UseFormSetValue<OrderFormValue>;
  disabled?: boolean;
  onOpenMemberSearch?: () => void;
}

export default function BasicInfoFields({ register, watch, setValue, disabled = false, onOpenMemberSearch }: Props) {
  const orderType = watch("orderType");

  const SIDO_SIGUNGU: Record<string, string[]> = {
    "서울특별시": ["강남구", "서초구", "송파구", "강북구"],
    "경기도": ["성남시", "수원시", "용인시", "고양시"],
    "부산광역시": ["해운대구", "수영구", "부산진구"],
  };

  const handleOrderTypeChange = (value: string) => {
    if (value === "auto") {
      // reset member fields
      setValue("receiverShopId", "");
      setValue("region", "");
      setValue("shopName", "");
      setValue("phone", "");
      // ensure auto fields empty initially
      setValue("autoSido", "");
      setValue("autoSigungu", "");
    } else if (value === "member") {
      // reset auto fields
      setValue("autoSido", "");
      setValue("autoSigungu", "");
    }
  };
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

      {/* 주문 유형 */}
      <tr>
        <th>
          주문 유형 <span className="sf-req">*</span>
        </th>
        <td colSpan={3} className="py-1 px-2">
          <select
            {...register("orderType", {
              required: true,
              onChange: (e) => handleOrderTypeChange(e.target.value),
            })}
            className="border border-gray-300 rounded p-1 text-sm w-60 focus:ring-1 focus:ring-primary/20 focus:border-primary"
            defaultValue={""}
            disabled={disabled}
          >
            <option value="" disabled>
              선택하세요
            </option>
            <option value="member">회원 선택 발주</option>
            <option value="auto">자동 배정 발주</option>
          </select>
        </td>
      </tr>

      {/* 수주화원 (회원 선택 발주) */}
      {orderType === "member" && (
        <tr>
          <th>수주화원{/* no required mark */}</th>
          <td colSpan={3} className="py-1 px-2">
            <p className="flex gap-1">
              {/* Hidden field to hold selected receiver shop id */}
              <input type="hidden" {...register("receiverShopId")} />
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
                onClick={onOpenMemberSearch}
              >
                회원검색
              </button>
            </p>
          </td>
        </tr>
      )}

      {/* 자동 배정 발주용 지역선택 */}
      {orderType === "auto" && (
        <tr>
          <th>
            자동배정 지역 선택 <span className="sf-req">*</span>
          </th>
          <td colSpan={3} className="py-1 px-2">
            <div className="flex items-center gap-2">
              <select
                {...register("autoSido", {
                  validate: (v) => orderType !== "auto" || !!v || "시/도를 선택하세요",
                })}
                className="border border-gray-300 rounded p-1 text-sm w-44 focus:ring-1 focus:ring-primary/20 focus:border-primary"
                defaultValue={""}
                disabled={disabled}
                onChange={(e) => {
                  setValue("autoSido", e.target.value);
                  setValue("autoSigungu", "");
                }}
              >
                <option value="" disabled>
                  시/도 선택
                </option>
                {Object.keys(SIDO_SIGUNGU).map((sido) => (
                  <option key={sido} value={sido}>
                    {sido}
                  </option>
                ))}
              </select>
              <select
                {...register("autoSigungu", {
                  validate: (v) => orderType !== "auto" || !!v || "구/군을 선택하세요",
                })}
                className="border border-gray-300 rounded p-1 text-sm w-44 focus:ring-1 focus:ring-primary/20 focus:border-primary"
                defaultValue={""}
                disabled={disabled || !watch("autoSido")}
              >
                {!watch("autoSido") ? (
                  <option value="" disabled>
                    시/도를 먼저 선택하세요
                  </option>
                ) : (
                  <>
                    <option value="" disabled>
                      구/군 선택
                    </option>
                    {(SIDO_SIGUNGU[watch("autoSido") as string] || []).map((sg) => (
                      <option key={sg} value={sg}>
                        {sg}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
