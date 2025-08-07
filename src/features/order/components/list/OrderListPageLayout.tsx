// app/orders/purchase/_components/OrderListPageLayout.tsx
import { ReactNode } from "react";
import { OrderListFilter } from "./OrderListFilter";

interface Props {
  children: ReactNode;
}

export function OrderListPageLayout({ children }: Props) {
  return (
    <>
      <OrderListFilter />
      {children}
    </>
  );
}
