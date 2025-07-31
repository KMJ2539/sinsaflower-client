import Image from "next/image";
import Link from "next/link";
import { getUser } from "@/features/auth/services/auth.server";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import UserDropdown from "@/features/auth/components/UserDropDown";

const Header = async () => {
  const currentUser = await getUser();

  return (
    <header className="bg-white shadow py-2 items-center mb-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/logo_2.jpg"
              alt="신사 플라워 로고"
              width={150}
              height={30}
            />
            {/* <span className="pl-2 text-xl font-bold text-primary">
            신사 플라워
          </span> */}
          </Link>

          <nav className="space-x-4 pl-10">
            <Link href="order-form" className="text-md hover:underline">
              발주
            </Link>
            <Link href="/all-orders" className="text-md hover:underline">
              주문확인
            </Link>
            {/* {isAdmin && (
            <Link
              href="/admin-dashboard"
              className="text-sm hover:underline bg-red-100 px-2 py-1 rounded"
            >
              관리자
            </Link>
          )} */}
          </nav>
        </div>
        <div className="flex text-md space-x-4 invisible md:visible">
          {!currentUser && (
            <>
              <div className="hover:underline">당일미취급</div>
              <div className="hover:underline">배송지역 설정</div>
              <UserDropdown></UserDropdown>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
