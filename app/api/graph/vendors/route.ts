import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET /api/graph/vendors — List all vendors
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  try {
    let q = supabase
      .from("vendors")
      .select(`
        id, name, name_ar, description, headquarters_country_id, website, sort_order
      `);

    if (query) {
      q = q.or(`name.ilike.%${query}%,name_ar.ilike.%${query}%`);
    }

    const { data, error } = await q.order("sort_order");
    if (error) throw error;
    return NextResponse.json({ vendors: data || [] });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch vendors" }, { status: 500 });
  }
}
