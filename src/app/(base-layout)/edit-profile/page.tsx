import EditUserForm from "@/features/auth/components/EditUserForm";
import { useState } from "react";

export default function Page() {
  return (
    <div className="bg-white p-8 rounded shadow min-h-full">
      <div className="flex justify-between border-b border-b-gray-500 pb-2 mb-6">
        <h2 className="text-xl font-semibold">회원 정보 수정</h2>
      </div>

      <EditUserForm />
    </div>
  );
}
