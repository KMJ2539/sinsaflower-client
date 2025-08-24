import { OrderListFilter } from "@/features/order/components/list/OrderListFilter";
import { OrderCanceledTable } from "@/features/order/components/table/OrderCanceledTable";
import { OrderSearchProvider } from "@/features/order/context/order-search.context";
import { OrderStatus } from "@/features/order/types/orderStatus";
import ContentLayout from "@/shared/components/layout/ContentLayout";

export default function Page() {
  const fixedStatus: OrderStatus = "CANCELED";
  return (
    <ContentLayout title="취소주문리스트">
      <OrderSearchProvider fixedStatus={fixedStatus}>
        <OrderListFilter fixedStatus={fixedStatus} />
        <OrderCanceledTable />
      </OrderSearchProvider>
    </ContentLayout>
  );
}
