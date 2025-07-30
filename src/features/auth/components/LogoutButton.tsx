"use client";

import { useAuth } from "@/shared/context/auth.context";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <button onClick={handleLogout} className="text-sm text-red-500">
      로그아웃
    </button>
  );
}
