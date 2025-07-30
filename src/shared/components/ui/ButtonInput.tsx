import { ButtonInputProps } from "@/shared/types/input";
import FormInput from "./FormInput";
import { clsx } from "clsx";
import { Button } from "./Button";

export default function ButtonInput({
  buttonLabel,
  buttonOnClick,
  ...baseProps
}: ButtonInputProps) {
  return (
    <FormInput {...baseProps}>
      <Button
        onClick={buttonOnClick}
        className={clsx(
          "rounded-md w-28 md:w-24 my-2 ml-2 justify-center px-2 border border-transparent shadow-sm text-sm font-medium"
        )}
      >
        {buttonLabel}
      </Button>
    </FormInput>
  );
}
