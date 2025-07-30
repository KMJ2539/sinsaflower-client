// import { BaseInputProps } from "@/shared/types/input";
// import { clsx } from "clsx";

// export default function BaseInput({
//   label,
//   placeholder,
//   isRequired = false,
//   disabled = false,
//   error = null,
//   children,
// }: BaseInputProps) {
//   return (
//     <div className="my-2 tracking-tight">
//       <label>
//         {label}
//         {isRequired && <abbr />}
//       </label>
//       <div className="flex">
//         <input
//           name={name}
//           type={type}
//           value={value}
//           className={clsx(
//             "w-full border border-input px-3 p-2 my-2 rounded-md",
//             error && "border-danger"
//           )}
//           placeholder={placeholder}
//           onChange={onChange}
//           required={isRequired}
//           disabled={disabled}
//         />
//         {children}
//       </div>
//       {error && <div className="text-danger text-xs pt-1">{error}</div>}
//     </div>
//   );
// }
