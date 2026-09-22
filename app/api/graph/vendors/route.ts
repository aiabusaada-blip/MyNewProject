import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase/client";

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const { searchParams } = request.nextUrl;
    const q = searchParams.get("q");

    let query = supabase.from("vendors").select(`
      *,
      products(name, name_ar)
    `).order("sort_order", { ascending: true });

    if (q) query = query.ilike("name", `%${q}%`);

    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json({ vendors: data });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
