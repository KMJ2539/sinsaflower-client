export type User = { id: string; name: string; role?: string };
export type Comment = { id: string; postId: string; author: User; body: string; createdAt: string };
export type Post = { id: string; title: string; body: string; author: User; isNotice?: boolean; createdAt: string; comments?: Comment[] };

export const posts: Post[] = [
  {
    id: "1",
    title: "환영합니다!",
    body: "신사 플라워 커뮤니티에 오신 것을 환영합니다.",
    author: { id: "admin", name: "관리자", role: "admin" },
    isNotice: true,
    createdAt: new Date().toISOString(),
    comments: [
      { id: "c1", postId: "1", author: { id: "u1", name: "사용자1" }, body: "반가워요!", createdAt: new Date().toISOString() },
    ],
  },
  {
    id: "2",
    title: "첫 번째 게시글",
    body: "여기는 자유롭게 글을 쓰는 공간입니다.",
    author: { id: "u2", name: "꽃장수" },
    createdAt: new Date().toISOString(),
    comments: [],
  },
];

let idCounter = 100;
export const genId = () => String(++idCounter);
