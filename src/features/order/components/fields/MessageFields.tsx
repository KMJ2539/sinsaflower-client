import {
  Control,
  useFieldArray,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { useEffect, useState } from "react";
import { OrderFormValue } from "../../types/orderFormValue";

interface Props {
  register: UseFormRegister<OrderFormValue>;
  control: Control<OrderFormValue>;
  setValue: UseFormSetValue<OrderFormValue>;
  getValues: UseFormGetValues<OrderFormValue>;
  disabled?: boolean;
}

const messagePresets = [
  { hanja: "祝結婚", hangul: "축결혼" },
  { hanja: "祝華婚", hangul: "축화혼" },
  { hanja: "祝發展", hangul: "축발전" },
  { hanja: "祝開業", hangul: "축개업" },
  { hanja: "祝榮轉", hangul: "축영전" },
  { hanja: "祝昇進", hangul: "축승진" },
  { hanja: "謹弔", hangul: "근조" },
  { hanja: "삼가 고인의 명복을 빕니다.", hangul: "삼가 고인의 명복을 빕니다." },
];

export default function MessageFields({
  register,
  control,
  setValue,
  getValues,
  disabled = false,
}: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "messages", // messages: { text: string }[]
  });

  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  // ✅ 첫 번째 input 기본 생성
  useEffect(() => {
    if (fields.length === 0) append({ text: "" });
  }, [fields, append]);

  // ✅ 버튼 클릭 시 마지막 포커스된 input에 값 추가
  const handlePresetClick = (msg: string) => {
    if (disabled) return;
    const index = focusedIndex ?? 0;
    const fieldName = `messages.${index}.text` as const;
    const currentValue = getValues(fieldName) || ""; // 현재 값 가져오기
    setValue(fieldName, currentValue + msg); // 새 값 설정
  };

  return (
    <tr>
      <th>경조사어</th>
      <td colSpan={3}>
        {/* 한자 버튼 */}
        {!disabled && (
          <div className="sf-chip-group mb-2">
            {messagePresets.map((m) => (
              <button
                key={`hanja-${m.hanja || m.hangul}`}
                type="button"
                data-color="pink"
                onClick={() => handlePresetClick(m.hanja)}
                className="sf-chip"
                disabled={disabled}
              >
                {m.hanja}
              </button>
            ))}
          </div>
        )}

        {/* 한글 버튼 */}
        {!disabled && (
          <div className="sf-chip-group mb-2">
            {messagePresets.map((m) => (
              <button
                key={`hangul-${m.hangul}`}
                type="button"
                data-color="pink"
                onClick={() => handlePresetClick(m.hangul)}
                className="sf-chip"
                disabled={disabled}
              >
                {m.hangul}
              </button>
            ))}
          </div>
        )}

        {/* 추가 버튼 */}
        {!disabled && (
          <button
            type="button"
            onClick={() => {
              if (!disabled) append({ text: "" });
            }}
            className="sf-btn-img--lg mb-2"
            disabled={disabled}
          >
            경조사어 추가
          </button>
        )}

        {/* 입력 필드 */}
        <div className="space-y-1">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-center">
              {fields.length > 1 && (
                <span className="text-xs w-4 text-left pl-2">{index + 1}.</span>
              )}
              <input
                {...register(`messages.${index}.text`)}
                className="border p-0.5 text-xs flex-1"
                placeholder="경조사어 입력"
                disabled={disabled}
              />
              {!disabled && (
                <button
                  type="button"
                  onClick={() => remove(index)}
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
  );
}
