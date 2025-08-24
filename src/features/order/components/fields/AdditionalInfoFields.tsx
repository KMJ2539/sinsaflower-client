import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import { OrderFormValue } from "../../types/orderFormValue";

interface Props {
  register: UseFormRegister<OrderFormValue>;
  control: Control<OrderFormValue>;
  disabled?: boolean;
}

export default function AdditionalInfoFields({
  register,
  control,
  disabled = false,
}: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "senderList",
  });

  return (
    <>
      <tr>
        <th>보내는 분</th>
        <td colSpan={3}>
          <div className="space-y-1">
            {!disabled && (
              <button
                type="button"
                onClick={() => {
                  if (!disabled) append({ name: "" });
                }}
                className="sf-btn-img--lg"
                disabled={disabled}
              >
                보내는 분 추가
              </button>
            )}
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                {fields.length > 1 && (
                  <span className="text-xs w-4 text-left pl-2">
                    {index + 1}.
                  </span>
                )}
                <input
                  {...register(`senderList.${index}.name`)}
                  className="border p-0.5 text-xs"
                  placeholder="이름"
                  disabled={disabled}
                />
                {!disabled && (
                  <button
                    type="button"
                    onClick={() => {
                      if (!disabled) remove(index);
                    }}
                    className="sf-btn-img--sm"
                    disabled={disabled}
                  >
                    삭제
                  </button>
                )}
              </div>
            ))}
          </div>
        </td>
      </tr>

      <tr>
        <th>카드</th>
        <td colSpan={3}>
          <textarea
            {...register("card")}
            className="border p-0.5 text-xs w-full"
            placeholder="카드 내용 입력"
            disabled={disabled}
          />
        </td>
      </tr>

      <tr>
        <th>요구사항</th>
        <td colSpan={3}>
          <textarea
            {...register("request")}
            className="border p-0.5 text-xs w-full"
            placeholder="요구사항 입력"
            disabled={disabled}
          />
        </td>
      </tr>

      {/* 인수자 정보 - view 모드에서만 표시 */}
      {disabled && (
        <>
          <tr>
            <th>인수자</th>
            <td>
              <input
                type="text"
                className="border p-0.5 text-xs w-full"
                placeholder="인수자명"
                disabled={disabled}
              />
            </td>
            <th>인수시간</th>
            <td>
              <input
                type="text"
                className="border p-0.5 text-xs w-full"
                placeholder="인수시간"
                disabled={disabled}
              />
            </td>
          </tr>

          <tr>
            <th>인수자와의 관계</th>
            <td>
              <input
                type="text"
                className="border p-0.5 text-xs w-full"
                placeholder="관계"
                disabled={disabled}
              />
            </td>
            <th>전달 메세지</th>
            <td>
              <input
                type="text"
                className="border p-0.5 text-xs w-full"
                placeholder="전달 메세지"
                disabled={disabled}
              />
            </td>
          </tr>

          <tr>
            <th>인수자 등록일자</th>
            <td>
              <input
                type="text"
                className="border p-0.5 text-xs w-full"
                placeholder="등록일자"
                disabled={disabled}
              />
            </td>
            <th>배달일시</th>
            <td>
              <input
                type="text"
                className="border p-0.5 text-xs w-full"
                placeholder="배달일시"
                disabled={disabled}
              />
            </td>
          </tr>

          <tr>
            <th>배송사진</th>
            <td colSpan={3}>
              <button
                type="button"
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200"
              >
                이미지보기
              </button>
            </td>
          </tr>
        </>
      )}
    </>
  );
}
