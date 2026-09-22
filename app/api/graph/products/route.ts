import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase/client";

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const { searchParams } = request.nextUrl;
    const domain = searchParams.get("domain");
    const category = searchParams.get("category");
    const q = searchParams.get("q");

    let query = supabase.from("products").select(`
      *,
      vendor:vendors(name, name_ar),
      category:technology_categories(name, name_ar),
      product_capabilities:product_capabilities(capability:capabilities(name, name_ar))
    `).order("sort_order", { ascending: true });

    if (domain) query = query.eq("domain_id", domain);
    if (category) query = query.eq("category_id", category);
    if (q) query = query.ilike("name", `%${q}%`);

    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json({ products: data });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
