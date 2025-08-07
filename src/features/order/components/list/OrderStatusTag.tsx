// OrderStatusTag.tsx
export default function OrderStatusTag({ status }: { status: string }) {
  const base = "px-3 py-1 rounded-full text-xs font-medium shadow-sm";

  if (status === "배송완료")
    return (
      <span
        className={`${base} bg-gradient-to-r from-success to-green-500 text-white`}
      >
        {status}
      </span>
    );
  if (status === "배송준비")
    return (
      <span
        className={`${base} bg-gradient-to-r from-yellow-400 to-yellow-500 text-white`}
      >
        {status}
      </span>
    );
  if (status === "주문접수")
    return (
      <span
        className={`${base} bg-gradient-to-r from-blue-400 to-blue-500 text-white`}
      >
        {status}
      </span>
    );
  if (status === "미확인")
    return (
      <span
        className={`${base} bg-gradient-to-r from-gray-400 to-gray-500 text-white`}
      >
        {status}
      </span>
    );
  if (status === "주문거절")
    return (
      <span
        className={`${base} bg-gradient-to-r from-danger to-red-500 text-white`}
      >
        {status}
      </span>
    );
  return (
    <span
      className={`${base} bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700`}
    >
      {status}
    </span>
  );
}
