// API: Professional capabilities add (ERROR-2 — duplicate function not allowed in route module)
// This file is intentionally minimal — the real capabilities API is at:
// app/api/professionals/[professionalId]/capabilities/index/route.ts
import { NextResponse } from "next/server";

export async function POST(_req: Request) {
  return NextResponse.json(
    { error: "This endpoint is not direct. Use POST /api/professionals/[professionalId]/capabilities instead." },
    { status: 400 }
  );
}

export async function GET(_req: Request) {
  return NextResponse.json(
    { error: "This endpoint is not direct. Use GET /api/professionals/[professionalId]/capabilities instead." },
    { status: 400 }
  );
}
