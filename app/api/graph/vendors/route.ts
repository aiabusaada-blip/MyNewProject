import { NextRequest, NextResponse } from "next/server";
import { seedVendors, seedProducts, getVendorProducts } from "@/lib/graph/seed-data";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const q = searchParams.get("q");

    if (q) {
      const filtered = seedVendors.filter(v =>
        v.name.toLowerCase().includes(q.toLowerCase()) ||
        v.description.toLowerCase().includes(q.toLowerCase())
      );
      const withProducts = filtered.map(v => ({
        ...v,
        products: getVendorProducts(v.id).map(p => ({ name: p.name, name_ar: p.name_ar })),
      }));
      return NextResponse.json({ vendors: withProducts });
    }

    const withProducts = seedVendors.map(v => ({
      ...v,
      products: getVendorProducts(v.id).map(p => ({ name: p.name, name_ar: p.name_ar })),
    }));
    return NextResponse.json({ vendors: withProducts });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load vendors" }, { status: 500 });
  }
}
