"use client";

import React from "react";
import { useAuth } from "@/shared/context/auth.context";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogout = () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      logout();
    } catch {
      // ignore errors; proceed to login regardless
    } finally {
      // Use replace to prevent back navigation into protected pages
      router.replace("/login");
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-red-500 disabled:opacity-60"
      disabled={isLoading}
      aria-disabled={isLoading}
    >
      {isLoading ? "로그아웃 중…" : "로그아웃"}
    </button>
  );
}
