import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

type ModalProps = {
  isOpen?: boolean;
  title: string;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  hasFooter?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
  size?: ModalSize;
};

type ModalSize = "sm" | "md" | "lg" | "xl";
const sizeMap: Record<ModalSize, string> = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-5xl",
};

export default function Modal({
  isOpen = false,
  title,
  children,
  confirmText,
  cancelText,
  hasFooter = true,
  onCancel,
  onConfirm,
  size = "sm",
}: ModalProps) {
  if (!isOpen) return null;

  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (onConfirm) {
      setIsLoading(true);
      console.log("isLoading?", isLoading);
      try {
        await onConfirm();
      } catch (error) {
        console.error("Error", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className={clsx(
          "bg-white rounded-lg shadow-xl w-full p-6 relative",
          sizeMap[size]
        )}
      >
        {isLoading && (
          <div className="fixed inset-0 bg-white/30 flex items-center justify-center z-100">
            <Image
              className="rounded-lg w-full max-w-md p-6 relative"
              src="/icons/spinner.svg"
              width={70}
              height={70}
              alt="spinner"
            />
          </div>
        )}
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <div className="mb-6">{children}</div>

        {hasFooter && (
          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-4 py-2 rounded-md text-white bg-primary"
            >
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
