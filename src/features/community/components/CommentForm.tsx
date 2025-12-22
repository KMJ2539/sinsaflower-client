"use client";

import React, { useState } from "react";

export default function CommentForm({ postId, onAdd }: any) {
  const [body, setBody] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/community/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body, author: { id: "demo-user", name: "데모유저" } }),
      });
      if (res.ok) {
        const json = await res.json();
        setBody("");
        onAdd && onAdd(json);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} className="w-full border rounded-xl px-3 py-2" placeholder="댓글을 입력하세요." />
      <div className="text-right">
        <button className="sf-btn sf-btn--primary" type="submit">댓글 쓰기</button>
      </div>
    </form>
  );
}
