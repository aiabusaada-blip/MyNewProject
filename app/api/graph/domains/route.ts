import { NextResponse } from "next/server";
import { seedDomains, seedCategories } from "@/lib/graph/seed-data";

export async function GET() {
  try {
    const domains = seedDomains.map(d => ({
      ...d,
      categories: seedCategories
        .filter(c => c.domain_id === d.id)
        .map(c => ({ id: c.id, name: c.name, name_ar: c.name_ar })),
    }));
    return NextResponse.json({ domains });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load domains" }, { status: 500 });
  }
}
