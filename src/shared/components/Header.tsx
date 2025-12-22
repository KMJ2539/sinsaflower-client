import Image from "next/image";
import Link from "next/link";
import { getUser } from "@/features/auth/server/auth.server";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import UserDropdown from "@/features/auth/components/UserDropDown";
import DeliveryRegionLauncher from "@/shared/components/DeliveryRegionLauncher";

const Header = async () => {
  const currentUser = await getUser();

  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-gray-200 py-4 items-center mb-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-all duration-200 hover:scale-105"
          >
            <Image
              src="/images/logo_2.jpg"
              alt="신사 플라워 로고"
              width={150}
              height={30}
              className="rounded-lg"
            />
          </Link>

          {/*
          <nav className="space-x-8 pl-12">
            <Link
              href="orders/create"
              className="text-lg font-semibold text-gray-800 hover:text-primary hover:scale-105 transition-all duration-200 relative group"
            >
              발주
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              href="/orders/sales"
              className="text-lg font-semibold text-gray-800 hover:text-primary hover:scale-105 transition-all duration-200 relative group"
            >
              주문확인
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </nav>
          */}
        </div>
        <div className="flex text-lg space-x-8 invisible md:visible">
          {!currentUser && (
            <>
              {/*
              <div className="font-medium text-gray-700 hover:text-primary hover:scale-105 transition-all duration-200 cursor-pointer">
                당일미취급
              </div>
              */}
              <DeliveryRegionLauncher />
              <UserDropdown></UserDropdown>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
