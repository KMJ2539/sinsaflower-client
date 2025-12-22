import { posts, genId, Post } from "./_data";

export async function GET() {
  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newPost: Post = {
      id: genId(),
      title: body.title || "(제목 없음)",
      body: body.body || "",
      author: body.author || { id: "anonymous", name: "익명" },
      isNotice: !!body.isNotice,
      createdAt: new Date().toISOString(),
      comments: [],
    };
    posts.unshift(newPost);
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
}
