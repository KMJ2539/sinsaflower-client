import { AuthProvider } from "@/shared/context/auth.context";
import { getUser } from "@/features/auth/server/auth.server";
import Header from "@/shared/components/Header";
import SideMenu from "@/shared/components/SideMenu";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dashBoardInfo = await getUser();

  return (
    <div className="bg-gradient-to-br from-gray-50 to-light/20 text-gray-800 min-h-screen">
      <style>{`
        .label { font-weight: bold; margin-right: 6px; }
      `}</style>

      {/* Header */}
      <Header></Header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto mt-4 px-6 grid grid-cols-1 md:grid-cols-12 gap-2">
        {/* SideMenu */}
        <SideMenu></SideMenu>

        {/* 메인 컨텐츠 영역 */}
        <AuthProvider>
          <section className="md:col-span-10 md:pl-6 pb-10">{children}</section>
        </AuthProvider>
      </main>

      {/* Footer */}
      <footer className="mt-8 text-center text-sm text-gray-500 p-4 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <p>&copy; 2025 신사플라워. All rights reserved.</p>
          <p className="text-xs mt-1 text-gray-400">
            꽃으로 전하는 따뜻한 마음
          </p>
        </div>
      </footer>
    </div>
  );
}
