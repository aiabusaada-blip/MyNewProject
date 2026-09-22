import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET /api/graph/domains — List all technology domains
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  try {
    if (query) {
      // Search across domains, categories, vendors, products, capabilities, aliases
      const [domains, categories, vendors, products, capabilities] =
        await Promise.all([
          supabase
            .from("technology_domains")
            .select("*")
            .ilike("name", `%${query}%`)
            .order("sort_order"),
          supabase
            .from("technology_categories")
            .select("*")
            .ilike("name", `%${query}%`)
            .order("sort_order"),
          supabase
            .from("vendors")
            .select("*")
            .ilike("name", `%${query}%`)
            .order("sort_order"),
          supabase
            .from("products")
            .select("*")
            .ilike("name", `%${query}%`)
            .order("sort_order"),
          supabase
            .from("capabilities")
            .select("*")
            .ilike("name", `%${query}%`)
            .order("sort_order"),
        ]);

      return NextResponse.json({
        domains: domains.data || [],
        categories: categories.data || [],
        vendors: vendors.data || [],
        products: products.data || [],
        capabilities: capabilities.data || [],
      });
    }

    // Get all domains with nested data
    const { data: domains, error } = await supabase
      .from("technology_domains")
      .select(`
        id, name, name_ar, description, sort_order,
        categories:technology_categories (
          id, name, name_ar, sort_order
        )
      `)
      .order("sort_order");

    if (error) throw error;
    return NextResponse.json({ domains });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch technology graph" }, { status: 500 });
  }
}
