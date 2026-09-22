import { NextRequest, NextResponse } from "next/server";
import { seedProducts, seedVendors, seedCategories, seedDomains } from "@/lib/graph/seed-data";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const domain = searchParams.get("domain");
    const category = searchParams.get("category");
    const q = searchParams.get("q");

    let products = [...seedProducts];

    if (domain) {
      const domainVendorIds = seedVendors
        .filter(v => {
          // Check if any product from this vendor is in the domain's categories
          const domainCats = seedCategories.filter(c => c.domain_id === (seedDomains.find(d => d.name.toLowerCase() === domain.toLowerCase())?.id));
          return products.some(p => p.vendor_id === v.id && domainCats.some(c => c.id === p.category_id));
        })
        .map(v => v.id);
      products = products.filter(p => domainVendorIds.includes(p.vendor_id));
    }

    if (category) {
      products = products.filter(p => {
        const cat = seedCategories.find(c => c.name.toLowerCase() === category.toLowerCase());
        return cat ? p.category_id === cat.id : false;
      });
    }

    if (q) {
      const ql = q.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(ql) ||
        p.description.toLowerCase().includes(ql)
      );
    }

    const enriched = products.map(p => {
      const vendor = seedVendors.find(v => v.id === p.vendor_id);
      const cat = seedCategories.find(c => c.id === p.category_id);
      return {
        ...p,
        vendor_name: vendor?.name || "",
        vendor_name_ar: vendor?.name_ar || "",
        category_name: cat?.name || "",
        category_name_ar: cat?.name_ar || "",
      };
    });

    return NextResponse.json({ products: enriched });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
  }
}
