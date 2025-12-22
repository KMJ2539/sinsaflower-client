"use client";

import React from "react";

export default function CommentList({ comments = [] }: any) {
  if (!comments.length) return <div className="text-sm text-gray-500">댓글이 없습니다.</div>;
  return (
    <ul className="space-y-3">
      {comments.map((c: any) => (
        <li key={c.id} className="bg-white border rounded-xl p-3">
          <div className="text-sm font-medium">{c.author?.name}</div>
          <div className="text-sm text-gray-700 mt-1">{c.body}</div>
          <div className="text-xs text-gray-400 mt-2">{new Date(c.createdAt).toLocaleString()}</div>
        </li>
      ))}
    </ul>
  );
}
