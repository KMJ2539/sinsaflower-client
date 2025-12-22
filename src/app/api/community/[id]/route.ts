import { posts } from "../_data";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const post = posts.find((p) => p.id === id);
  if (!post) return new Response(null, { status: 404 });
  return new Response(JSON.stringify(post), { status: 200 });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return new Response(null, { status: 404 });
  posts.splice(idx, 1);
  return new Response(null, { status: 204 });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await request.json();
    const post = posts.find((p) => p.id === id);
    if (!post) return new Response(null, { status: 404 });
    if (body.title) post.title = body.title;
    if (body.body) post.body = body.body;
    if (typeof body.isNotice === "boolean") post.isNotice = body.isNotice;
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
}
