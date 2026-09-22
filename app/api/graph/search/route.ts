import { NextRequest, NextResponse } from "next/server";
import { seedProducts, seedVendors, seedCapabilities, seedCategories, searchAll } from "@/lib/graph/seed-data";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const q = searchParams.get("q") || "";

    if (!q) return NextResponse.json({ results: [] });

    const results = searchAll(q);

    const products = results.products.slice(0, 10).map(p => {
      const vendor = seedVendors.find(v => v.id === p.vendor_id);
      const cat = seedCategories.find(c => c.id === p.category_id);
      return {
        name: p.name,
        name_ar: p.name_ar,
        vendor_name: vendor?.name || "",
        vendor_name_ar: vendor?.name_ar || "",
        category_name: cat?.name || "",
        category_name_ar: cat?.name_ar || "",
      };
    });

    const vendors = results.vendors.slice(0, 10).map(v => ({
      name: v.name,
      name_ar: v.name_ar,
      products: seedProducts.filter(p => p.vendor_id === v.id).map(p => ({ name: p.name, name_ar: p.name_ar })),
    }));

    const capabilities = results.capabilities.slice(0, 10).map(c => ({
      name: c.name,
      name_ar: c.name_ar,
    }));

    return NextResponse.json({ results: { products, vendors, capabilities } });
  } catch (error) {
    return NextResponse.json({ error: "Failed to search" }, { status: 500 });
  }
}
