"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import CommentList from "@/features/community/components/CommentList";
import CommentForm from "@/features/community/components/CommentForm";

export default function PostDetail() {
  const params = useParams();
  const id = params?.id as string;
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      const res = await fetch(`/api/community/${id}`);
      if (res.ok) setPost(await res.json());
    };
    fetchPost();
  }, [id]);

  const handleAddComment = (c: any) => {
    setPost((prev: any) => ({ ...prev, comments: [...(prev.comments || []), c] }));
  };

  if (!post) return <div className="p-8">게시글을 불러오는 중...</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <div className="bg-white border rounded-xl p-6">
        {post.isNotice && <div className="text-amber-600 font-semibold">공지</div>}
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <div className="text-sm text-gray-500 mb-4">작성자: {post.author?.name}</div>
        <div className="prose max-w-none text-gray-800">{post.body}</div>
      </div>

      <div className="bg-white border rounded-xl p-6">
        <h3 className="font-semibold mb-3">댓글</h3>
        <CommentList comments={post.comments || []} />
        <div className="mt-4">
          <CommentForm postId={id} onAdd={handleAddComment} />
        </div>
      </div>
    </div>
  );
}
