import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase/client";

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("technology_domains")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return NextResponse.json({ domains: data });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
