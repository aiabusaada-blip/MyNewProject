// API: List / add professional capabilities (linked to Technology Graph)
import { NextRequest, NextResponse } from "next/server";
import {
  getProfessionalCapabilities, addProfessionalCapability,
  updateProfessionalCapability, deleteProfessionalCapability,
} from "@/lib/graph/professionals-data";
import {
  getDomainById, getVendorById, getProductById,
  getCapabilityById, seedCapabilities, seedProducts, seedVendors, seedDomains, seedCategories,
} from "@/lib/graph/seed-data";

// Inline category lookup (categories Map is in seed-data but not exported)
function getCategoryById(id: string) {
  // Re-derive from seed data: seedCategories() returns an array, build a map
  const cats = seedCategories;
  const map = new Map((cats as any[]).map((c: any) => [c.id, c]));
  return map.get(id);
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const caps = getProfessionalCapabilities(id);
    // Enrich with names from Technology Graph
    const enriched = caps.map(c => {
      const domain = c.domain_id ? getDomainById(c.domain_id) : undefined;
      const category = c.category_id ? getCategoryById(c.category_id) : undefined;
      const vendor = c.vendor_id ? getVendorById(c.vendor_id) : undefined;
      const product = c.product_id ? getProductById(c.product_id) : undefined;
      const capability = c.capability_id ? getCapabilityById(c.capability_id) : undefined;
      return {
        ...c,
        domain_name: domain?.name,
        domain_name_ar: domain?.name_ar,
        category_name: category?.name,
        category_name_ar: category?.name_ar,
        vendor_name: vendor?.name,
        vendor_name_ar: vendor?.name_ar,
        product_name: product?.name,
        product_name_ar: product?.name_ar,
        capability_name: capability?.name,
        capability_name_ar: capability?.name_ar,
      };
    });
    return NextResponse.json({ capabilities: enriched });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch capabilities" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    // Validate: at least one link to the Technology Graph
    if (!body.domain_id && !body.category_id && !body.vendor_id && !body.product_id && !body.capability_id) {
      return NextResponse.json(
        { error: "At least one Technology Graph link is required (domain_id, category_id, vendor_id, product_id, or capability_id)" },
        { status: 400 }
      );
    }
    // Validate linked entities exist
    if (body.domain_id && !getDomainById(body.domain_id)) {
      return NextResponse.json({ error: "Invalid domain_id" }, { status: 400 });
    }
    if (body.category_id && !getCategoryById(body.category_id)) {
      return NextResponse.json({ error: "Invalid category_id" }, { status: 400 });
    }
    if (body.vendor_id && !getVendorById(body.vendor_id)) {
      return NextResponse.json({ error: "Invalid vendor_id" }, { status: 400 });
    }
    if (body.product_id && !getProductById(body.product_id)) {
      return NextResponse.json({ error: "Invalid product_id" }, { status: 400 });
    }
    if (body.capability_id && !getCapabilityById(body.capability_id)) {
      return NextResponse.json({ error: "Invalid capability_id" }, { status: 400 });
    }
    const cap = addProfessionalCapability({ ...body, professional_id: id } as any);
    return NextResponse.json({ capability: cap }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to add capability" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const capabilityId = body.capability_id || body.id;
    if (!capabilityId) {
      return NextResponse.json({ error: "capability_id or id is required in the request body" }, { status: 400 });
    }
    const cap = updateProfessionalCapability(capabilityId, body as any);
    if (!cap) return NextResponse.json({ error: "Capability not found" }, { status: 404 });
    if (cap.professional_id !== id) {
      return NextResponse.json({ error: "Capability does not belong to this professional" }, { status: 403 });
    }
    return NextResponse.json({ capability: cap });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update capability" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await _req.json().catch(() => ({}));
    const capabilityId = body.capability_id || body.id;
    if (!capabilityId) {
      return NextResponse.json({ error: "capability_id or id is required in the request body" }, { status: 400 });
    }
    const caps = getProfessionalCapabilities(id);
    const cap = caps.find(c => c.id === capabilityId);
    if (!cap) return NextResponse.json({ error: "Capability not found" }, { status: 404 });
    if (cap.professional_id !== id) {
      return NextResponse.json({ error: "Capability does not belong to this professional" }, { status: 403 });
    }
    const deleted = deleteProfessionalCapability(capabilityId);
    return NextResponse.json({ success: deleted });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete capability" }, { status: 500 });
  }
}
