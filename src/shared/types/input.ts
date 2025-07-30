import React from "react";

export type FormInputProps = {
  label?: string;
  isRequired?: boolean;
  disabled?: boolean;
  placeholder?: string;
  error?: string | null;
  children?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

// ButtonInput 에서는 확장
export interface ButtonInputProps extends FormInputProps {
  buttonLabel: string;
  buttonOnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonColor?: string;
}
