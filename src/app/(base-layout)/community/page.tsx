"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import PostCard from "@/features/community/components/PostCard";

type Post = {
  id: string;
  title: string;
  body: string;
  author: { id: string; name: string };
  isNotice?: boolean;
  createdAt: string;
};

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/community`);
        const data = await res.json();
        setPosts(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">커뮤니티</h1>
        <div className="space-x-2">
          <Link href="/community/new" className="sf-btn sf-btn--primary">
            새 글쓰기
          </Link>
          <Link href="/community/admin/notices" className="sf-btn">
            공지(관리자)
          </Link>
        </div>
      </div>

      {loading ? (
        <div>불러오는 중...</div>
      ) : (
        <div className="space-y-4">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
