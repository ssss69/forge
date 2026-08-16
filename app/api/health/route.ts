export async function GET() {
  return Response.json({
    status: "ok",
    service: "forge-backend",
    version: "0.1.0",
  });
}
