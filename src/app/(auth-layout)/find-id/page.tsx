"use client";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function onlyDigits(v: string) {
  return v.replace(/\D/g, "");
}

export default function FindIdPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  const [errors, setErrors] = useState<{ name?: string; phone?: string; code?: string }>({});

  const [sendToken, setSendToken] = useState<string | null>(null);
  const [sendMsg, setSendMsg] = useState<string>("");
  const [resendLeft, setResendLeft] = useState<number>(0); // seconds
  const [ttlLeft, setTtlLeft] = useState<number>(0); // seconds

  const [submitting, setSubmitting] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const [result, setResult] = useState<null | { accounts: { id: string; createdAt: string }[] }>(null);
  const [resultError, setResultError] = useState<string>("");

  // timers
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
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(1, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const validateBasics = () => {
    const next: typeof errors = {};
    if (!name.trim()) next.name = "이름을 입력하세요";
    if (!/^\d{10,11}$/.test(phone)) next.phone = "휴대전화번호(숫자 10~11자리)";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const requestCode = async () => {
    setResult(null);
    setResultError("");
    if (!validateBasics()) return;
    setSubmitting(true);
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
    } finally {
      setSubmitting(false);
    }
  };

  const onConfirm = async () => {
    setErrors({});
    setResult(null);
    setResultError("");
    if (!validateBasics()) return;
    if (!sendToken) {
      setSendMsg("먼저 인증요청을 해주세요.");
      return;
    }
    if (!/^\d{4,6}$/.test(code)) {
      setErrors({ code: "인증번호 4~6자리" });
      return;
    }
    if (ttlLeft === 0) {
      setResultError("인증 시간이 만료되었습니다. 다시 요청해 주세요.");
      return;
    }
    setVerifying(true);
    try {
      const vres = await fetch("/api/auth/sms/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code, token: sendToken }),
      });
      const vjson = await vres.json();
      if (!vres.ok || !vjson.success) throw new Error(vjson.message || "인증 실패");

      const q = new URLSearchParams({ name: name.trim(), phone }).toString();
      const fres = await fetch(`/api/auth/find-id?${q}`);
      const fjson = await fres.json();
      if (!fres.ok || !fjson.success) throw new Error(fjson.message || "조회 실패");
      setResult({ accounts: fjson.accounts || [] });
    } catch (e: any) {
      setResultError(e?.message || "처리 중 오류가 발생했습니다.");
    } finally {
      setVerifying(false);
    }
  };

  const canRequest = useMemo(() => resendLeft === 0 && !submitting, [resendLeft, submitting]);
  const canConfirm = useMemo(() => !!name && !!phone && !!code && !!sendToken && !verifying, [name, phone, code, sendToken, verifying]);

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* 상단 바 제목 */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">아이디/비밀번호찾기</h1>
        <div className="mt-4 flex border-b">
          <div className="px-4 py-2 border-b-2 border-green-500 text-green-600 font-semibold">아이디 찾기</div>
          <Link href="/find-password" className="px-4 py-2 text-gray-500 hover:text-primary">비밀번호 찾기</Link>
        </div>
      </div>

      {/* 폼 카드 */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 space-y-5">
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

          {/* 개발용 강제 진입 버튼들 */}
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              className="sf-btn sf-btn--gray sf-btn--sm"
              onClick={() => {
                setResultError("");
                setResult({ accounts: [{ id: "sinsaflower01", createdAt: "2024-01-03" }] });
              }}
            >
              있을때
            </button>
            <button
              type="button"
              className="px-2 py-1 text-xs rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              onClick={() => {
                setResultError("");
                setResult({ accounts: [] });
              }}
            >
              없을때
            </button>
          </div>
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

      {/* 결과 영역 */}
      <div className="mt-6">
        {resultError && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
            <p className="text-sm">{resultError}</p>
            <div className="mt-3">
              <Link href="/register" className="sf-btn sf-btn--gray sf-btn--sm">회원가입 하러가기</Link>
            </div>
          </div>
        )}
        {result && (
          result.accounts.length > 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">아이디 찾기 결과</h2>
              <p className="text-sm text-gray-700 mb-3">입력하신 정보와 일치하는 아이디는 아래와 같습니다.</p>
              <div className="border rounded-lg p-3 text-center font-semibold text-primary bg-gray-50">
                {result.accounts[0]?.id || "sinsaflower01"}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Link href="/login" className="sf-btn sf-btn--primary sf-btn--sm">로그인 하러가기</Link>
                <Link href="/find-password" className="sf-btn sf-btn--gray sf-btn--sm">비밀번호 찾기</Link>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">아이디 찾기 결과</h2>
              <p className="text-sm text-gray-700">입력하신 정보와 일치하는 아이디가 없습니다.</p>
              <div className="mt-4 flex items-center gap-2">
                <button
                  className="sf-btn sf-btn--gray sf-btn--sm"
                  onClick={() => setResult(null)}
                >
                  다시 입력하기
                </button>
                <Link href="/register" className="px-2 py-1 text-xs rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                  회원가입 하러가기
                </Link>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
