"use client";

import React from "react";
import Link from "next/link";
import PostForm from "@/features/community/components/PostForm";

export default function NewPostPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">새 글쓰기</h1>
        <Link href="/community" className="sf-btn">
          목록으로
        </Link>
      </div>

      <PostForm />
    </div>
  );
}
