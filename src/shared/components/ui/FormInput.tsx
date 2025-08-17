import { FormInputProps } from "@/shared/types/input";
import clsx from "clsx";
import React from "react";

const Input = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, isRequired, error, children, hidden, ...rest }, ref) => {
    if (hidden) {
      return <input hidden {...rest} />;
    }

    return (
      <div className="my-2 tracking-tight">
        <label className="text-sm">
          {label}
          {isRequired && <span className="sf-req">*</span>}
        </label>
        <div className="flex">
          <input
            ref={ref}
            className={clsx(
              "w-full border border-input px-3 p-2 my-2 rounded-md",
              error && "!border-danger !mb-0"
            )}
            {...rest}
          />
          {children}
        </div>
        {error && <div className="text-danger text-sm pt-1 pl-2"> {error}</div>}
      </div>
    );
  }
);

export default Input;
