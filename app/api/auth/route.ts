import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase/client";

export async function GET(request: NextRequest) {
  const { data: { user }, error } = await getSupabase().auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Get user's profile and role
  const supabase = getSupabase();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: member } = await supabase
    .from("organization_members")
    .select("role_id")
    .eq("user_id", user.id)
    .single();

  let role = "PROFESSIONAL";
  if (member) {
    const { data: r } = await supabase
      .from("roles")
      .select("name")
      .eq("id", member.role_id)
      .single();
    if (r) role = r.name;
  }

  return NextResponse.json({ user, profile, role });
}
