import { AuthProvider } from "@/shared/context/auth.context";
import { getUser } from "@/features/auth/services/auth.service";
import Header from "@/shared/components/Header";
import SideMenu from "@/shared/components/SideMenu";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dashBoardInfo = await getUser();

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      <style>{`
        .label { font-weight: bold; margin-right: 6px; }
      `}</style>

      {/* Header */}
      <Header></Header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto mt-2 px-6 grid grid-cols-1 md:grid-cols-12 gap-2">
        {/* SideMenu */}
        <SideMenu></SideMenu>

        {/* 메인 컨텐츠 영역 */}
        <AuthProvider>
          <section className="md:col-span-10 md:pl-4 pb-10">{children}</section>
        </AuthProvider>
      </main>

      {/* Footer */}
      <footer className="mt-6 text-center text-xs text-gray-500 p-2">
        &copy; 2025 꽃비파트너스. All rights reserved.
      </footer>
    </div>
  );
}
