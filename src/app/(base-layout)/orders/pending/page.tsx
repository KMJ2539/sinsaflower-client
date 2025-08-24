import { OrderListFilter } from "@/features/order/components/list/OrderListFilter";
import { OrderPendingTable } from "@/features/order/components/table/OrderPendingTable";
import { OrderSearchProvider } from "@/features/order/context/order-search.context";
import { OrderStatus } from "@/features/order/types/orderStatus";
import ContentLayout from "@/shared/components/layout/ContentLayout";

export default function Page() {
  const fixedStatus: OrderStatus = "PENDING";
  return (
    <ContentLayout title="미확인주문리스트">
      <OrderSearchProvider fixedStatus={fixedStatus}>
        <OrderListFilter fixedStatus={fixedStatus} />
        <OrderPendingTable />
      </OrderSearchProvider>
    </ContentLayout>
  );
}
