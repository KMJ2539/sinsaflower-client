import Header from "@/shared/components/Header";
import { AuthProvider } from "@/shared/context/auth.context";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-6">
      <div className="space-y-3 w-full px-5 md:mx-20 md:max-w-4xl ">
        {/* logo */}
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="신사 플라워 로고"
            width={140}
            height={170}
            className="mx-auto"
          />
          {/* <p className="mt-2 text-center text-sm text-gray-600">
            전국 꽃집을 연결하는 B2B 플랫폼
          </p> */}
        </Link>
        {/* main */}
        <AuthProvider>
          <main className="h-full flex-1 flex-col">{children}</main>
        </AuthProvider>
        {/* Footer */}
        <footer className="text-center text-xs text-gray-500">
          &copy; 2025 신사 플라워. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
