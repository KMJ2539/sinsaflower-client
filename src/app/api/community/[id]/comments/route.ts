import { posts, genId } from "../../_data";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const post = posts.find((p) => p.id === id);
  if (!post) return new Response(null, { status: 404 });
  return new Response(JSON.stringify(post.comments || []), { status: 200 });
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await request.json();
    const post = posts.find((p) => p.id === id);
    if (!post) return new Response(null, { status: 404 });
    const comment = {
      id: genId(),
      postId: id,
      author: body.author || { id: "anonymous", name: "익명" },
      body: body.body || "",
      createdAt: new Date().toISOString(),
    };
    post.comments = post.comments || [];
    post.comments.push(comment);
    return new Response(JSON.stringify(comment), { status: 201 });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
}
