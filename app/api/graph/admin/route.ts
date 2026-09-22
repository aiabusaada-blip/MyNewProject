import { NextResponse } from "next/server";
import { getStats } from "@/lib/graph/seed-data";

export async function GET() {
  try {
    const stats = getStats();
    return NextResponse.json({ stats, message: "Technology Capability Graph — Phase 2" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load stats" }, { status: 500 });
  }
}
