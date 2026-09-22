import { NextResponse } from "next/server";
import { seedDomains } from "@/lib/graph/seed-data";

export async function GET() {
  try {
    return NextResponse.json({ domains: seedDomains });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load domains" }, { status: 500 });
  }
}
