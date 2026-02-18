import dbConnect from "@/lib/db";

export const runtime = "nodejs"; // IMPORTANT (mongoose doesn't run on edge)

export async function GET() {
  try {
    const conn = await dbConnect();

    return Response.json({
      ok: true,
      readyState: conn.readyState, // 1 = connected
      dbName: conn.name,
      host: conn.host,
    });
  } catch (err: any) {
    return Response.json(
      {
        ok: false,
        message: err?.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}
