import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase/client";

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const { searchParams } = request.nextUrl;
    const q = searchParams.get("q") || "";

    if (!q) return NextResponse.json({ results: [] });

    const { data: products, error: pErr } = await supabase
      .from("products").select("name, name_ar, vendor:vendors(name, name_ar), category:technology_categories(name, name_ar)")
      .ilike("name", `%${q}%`).limit(10);

    const { data: vendors, error: vErr } = await supabase
      .from("vendors").select("name, name_ar, products(name, name_ar)")
      .ilike("name", `%${q}%`).limit(10);

    const { data: capabilities, error: cErr } = await supabase
      .from("capabilities").select("name, name_ar, type, product_capabilities:product_capabilities(product:products(name, name_ar))")
      .ilike("name", `%${q}%`).limit(10);

    if (pErr) throw pErr;
    if (vErr) throw vErr;
    if (cErr) throw cErr;

    return NextResponse.json({ results: { products, vendors, capabilities } });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
