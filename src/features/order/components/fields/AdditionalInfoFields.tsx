import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import { OrderFormValues } from "../../types/orderFormValues";

interface Props {
  register: UseFormRegister<OrderFormValues>;
  control: Control<OrderFormValues>;
}

export default function AdditionalInfoFields({ register, control }: Props) {
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
            <button
              type="button"
              onClick={() => append({ name: "" })}
              className="sf-btn-img--lg"
            >
              보내는 분 추가
            </button>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <span className="text-xs w-4 text-left pl-2">{index + 1}.</span>
                <input
                  {...register(`senderList.${index}.name`)}
                  className="border p-0.5 text-xs"
                  placeholder="이름"
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="sf-btn-img--sm"
                >
                  삭제
                </button>
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
          />
        </td>
      </tr>
    </>
  );
}
