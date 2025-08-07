import OrderForm from "@/features/order/components/form/OrderForm";
import ContentLayout from "@/shared/components/layout/ContentLayout";

export default function Page() {
  return (
    <ContentLayout title="발주">
      <OrderForm />
    </ContentLayout>
  );
}
