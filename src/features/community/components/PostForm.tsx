"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostForm({ initial = {}, isNotice = false }: any) {
  const [title, setTitle] = useState(initial.title || "");
  const [body, setBody] = useState(initial.body || "");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/community`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, isNotice }),
      });
      if (res.ok) {
        router.push("/community");
      } else {
        console.error(await res.text());
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">제목</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-xl px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">본문</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={8}
              className="w-full border rounded-xl px-3 py-2 mt-1"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            type="button"
            className="sf-btn"
            onClick={() => router.push("/community")}
          >
            취소
          </button>
          <button type="submit" className="sf-btn sf-btn--primary">
            저장
          </button>
        </div>
      </div>
    </form>
  );
}
