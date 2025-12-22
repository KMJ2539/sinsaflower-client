"use client";

import React from "react";
import Link from "next/link";

export default function PostCard({ post }: any) {
  return (
    <article className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            <Link href={`/community/${post.id}`}>{post.title}</Link>
          </h3>
          <div className="text-sm text-gray-500">작성자: {post.author?.name}</div>
        </div>
        {post.isNotice && <div className="text-sm text-amber-600 font-semibold">공지</div>}
      </div>
      <p className="mt-3 text-sm text-gray-700 line-clamp-2">{post.body}</p>
      <div className="mt-3 text-xs text-gray-400">{new Date(post.createdAt).toLocaleString()}</div>
    </article>
  );
}
