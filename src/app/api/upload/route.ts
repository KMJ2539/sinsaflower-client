export async function POST(request: Request) {
  // Simple mock: return a placeholder URL. In production, implement signed S3/Cloudinary.
  return new Response(JSON.stringify({ url: "https://via.placeholder.com/800x600.png?text=uploaded" }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
