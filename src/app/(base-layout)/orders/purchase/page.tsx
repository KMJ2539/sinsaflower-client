import { MonthNavigation } from "@/features/order/components/list/MonthNavigation";
import { OrderListFilter } from "@/features/order/components/list/OrderListFilter";
import { OrderPurchaseTable } from "@/features/order/components/table/OrderPurchaseTable";
import { OrderSearchProvider } from "@/features/order/context/order-search.context";
import ContentLayout from "@/shared/components/layout/ContentLayout";

export default function Page() {
  return (
    <div className="space-y-6">
      {/* 상단 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-primary to-accent text-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">총 발주 건수</p>
              <p className="text-2xl font-bold">1,234</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-xl">📋</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">이번 달 발주</p>
              <p className="text-2xl font-bold">156</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-xl">📅</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">배송 완료</p>
              <p className="text-2xl font-bold">89</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">진행 중</p>
              <p className="text-2xl font-bold">67</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-xl">⏳</span>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <ContentLayout title="전체발주리스트" aside={<MonthNavigation />}>
        <OrderSearchProvider>
          <OrderListFilter />
          <OrderPurchaseTable />
        </OrderSearchProvider>
      </ContentLayout>
    </div>
  );
}
