import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET /api/graph/products — List all products with vendor info
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const vendor = searchParams.get("vendor");
  const capability = searchParams.get("capability");

  try {
    let q = supabase
      .from("products")
      .select(`
        id, name, name_ar, description, sort_order,
        vendor_id,
        vendor:vendors (id, name, name_ar),
        category_id,
        category:technology_categories (id, name, name_ar),
        capabilities:product_capabilities (
          id, proficiency_level,
          capability:capabilities (id, name, name_ar)
        )
      `);

    if (query) {
      q = q.or(`name.ilike.%${query}%,name_ar.ilike.%${query}%`);
    }
    if (vendor) {
      q = q.eq("vendor_id", (await supabase.from("vendors").select("id").eq("name", vendor).single()).data?.id);
    }

    const { data, error } = await q.order("sort_order");
    if (error) throw error;
    return NextResponse.json({ products: data || [] });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
