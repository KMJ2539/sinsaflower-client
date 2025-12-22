"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

function onlyDigits(v: string) {
  return v.replace(/\D/g, "");
}

export default function FindPasswordPage() {
  const [loginId, setLoginId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  const [errors, setErrors] = useState<{ loginId?: string; name?: string; phone?: string; code?: string }>({});

  const [sendToken, setSendToken] = useState<string | null>(null);
  const [sendMsg, setSendMsg] = useState<string>("");
  const [resendLeft, setResendLeft] = useState<number>(0);
  const [ttlLeft, setTtlLeft] = useState<number>(0);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (resendLeft <= 0) return;
    const t = setInterval(() => setResendLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [resendLeft]);

  useEffect(() => {
    if (ttlLeft <= 0) return;
    const t = setInterval(() => setTtlLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [ttlLeft]);

  const mmss = (secs: number) => {
    const m = Math.floor(secs / 60).toString();
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const validateBasics = () => {
    const next: typeof errors = {};
    if (!loginId.trim()) next.loginId = "아이디를 입력하세요";
    if (!name.trim()) next.name = "이름을 입력하세요";
    if (!/^\d{10,11}$/.test(phone)) next.phone = "휴대전화번호(숫자 10~11자리)";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const requestCode = async () => {
    if (!validateBasics()) return;
    try {
      const res = await fetch("/api/auth/sms/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || "발송 실패");
      setSendToken(json.token);
      setSendMsg("인증번호가 발송되었습니다.");
      setResendLeft(json.resendIn ?? 60);
      setTtlLeft(json.expiresIn ?? 300);
    } catch (e: any) {
      setSendMsg(e?.message || "발송 중 오류가 발생했습니다.");
    }
  };

  const onConfirm = async () => {
    // 인증/검증은 추후 연결. 현재는 바로 비밀번호 재설정으로 이동.
    const id = loginId.trim();
    window.location.href = `/reset-password${id ? `?loginId=${encodeURIComponent(id)}` : ""}`;
  };

  const canRequest = useMemo(() => resendLeft === 0, [resendLeft]);
  const canConfirm = useMemo(() => !!loginId && !!name && !!phone && !!code && !!sendToken && !verifying, [loginId, name, phone, code, sendToken, verifying]);

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* 상단 헤더 + 탭 */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">아이디/비밀번호찾기</h1>
        <div className="mt-4 flex border-b">
          <Link href="/find-id" className="px-4 py-2 text-gray-500 hover:text-primary">아이디 찾기</Link>
          <div className="px-4 py-2 border-b-2 border-green-500 text-green-600 font-semibold">비밀번호 찾기</div>
        </div>
      </div>

      {/* 폼 카드 */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 space-y-5">
        {/* 아이디 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">아이디</label>
          <input
            type="text"
            placeholder="아이디를 입력하세요"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
          {errors.loginId && <p className="mt-1 text-xs text-red-600">{errors.loginId}</p>}
        </div>

        {/* 이름 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
          <input
            type="text"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>

        {/* 휴대전화번호 + 인증요청 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">휴대전화번호</label>
          <div className="flex gap-2">
            <input
              type="tel"
              placeholder="01012345678"
              value={phone}
              onChange={(e) => setPhone(onlyDigits(e.target.value))}
              className="flex-1 border rounded-md px-3 py-2"
              inputMode="numeric"
              maxLength={11}
            />
            <button
              type="button"
              onClick={requestCode}
              disabled={!canRequest}
              className="sf-btn sf-btn--primary sf-btn--sm whitespace-nowrap disabled:opacity-50"
            >
              {resendLeft > 0 ? `재요청(${resendLeft}초)` : "인증요청"}
            </button>
          </div>
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
          {sendMsg && <p className="mt-1 text-xs text-gray-600">{sendMsg}</p>}
        </div>

        {/* 인증번호 + 타이머 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">인증번호</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="받으신 인증번호 6자리를 입력하세요"
              value={code}
              onChange={(e) => setCode(onlyDigits(e.target.value).slice(0, 6))}
              className="flex-1 border rounded-md px-3 py-2"
              inputMode="numeric"
              maxLength={6}
            />
            <span className="text-sm text-red-500 w-16 text-right">{ttlLeft > 0 ? mmss(ttlLeft) : ""}</span>
          </div>
          {errors.code && <p className="mt-1 text-xs text-red-600">{errors.code}</p>}
        </div>

        {/* 확인 버튼 */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onConfirm}
            disabled={!canConfirm}
            className="w-[220px] sf-btn sf-btn--primary sf-btn--md disabled:opacity-50"
          >
            {verifying ? "확인 중..." : "확인하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
