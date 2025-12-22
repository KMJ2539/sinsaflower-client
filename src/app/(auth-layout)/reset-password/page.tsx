"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useSearchParams();
  const loginId = params.get("loginId") || "";
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [msg, setMsg] = useState("");

  const onSave = async () => {
    setMsg("");
    if (!pw1 || !pw2) {
      setMsg("비밀번호를 입력하세요.");
      return;
    }
    if (pw1 !== pw2) {
      setMsg("비밀번호가 일치하지 않습니다.");
      return;
    }
    // Mock save
    setMsg("비밀번호가 재설정되었습니다.");
    setTimeout(() => router.push("/login"), 1200);
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <h1 className="text-xl font-bold text-gray-800">비밀번호 재설정</h1>
      <div className="bg-white rounded-2xl shadow-lg border p-6 space-y-4">
        <p className="text-sm text-gray-600">계정: <span className="font-semibold">{loginId}</span></p>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">새 비밀번호</label>
          <input type="password" className="w-full border rounded-md px-3 py-2" value={pw1} onChange={(e) => setPw1(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">새 비밀번호 확인</label>
          <input type="password" className="w-full border rounded-md px-3 py-2" value={pw2} onChange={(e) => setPw2(e.target.value)} />
        </div>
        {msg && <p className="text-sm text-primary">{msg}</p>}
        <div className="pt-2">
          <button onClick={onSave} className="sf-btn sf-btn--primary sf-btn--md">저장</button>
        </div>
      </div>
    </div>
  );
}
