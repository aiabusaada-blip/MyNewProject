// API: Get / create / update / delete a single professional
import { NextRequest, NextResponse } from "next/server";
import {
  getProfessionalById, createProfessional, updateProfessional, deleteProfessional,
} from "@/lib/graph/professionals-data";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const prof = getProfessionalById(id);
    if (!prof) return NextResponse.json({ error: "Professional not found" }, { status: 404 });
    return NextResponse.json({ professional: prof });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch professional" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const required = ["name", "headline", "summary", "country", "city", "years_experience"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }
    const prof = createProfessional(body as any);
    return NextResponse.json({ professional: prof }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create professional" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const prof = updateProfessional(id, body as any);
    if (!prof) return NextResponse.json({ error: "Professional not found" }, { status: 404 });
    return NextResponse.json({ professional: prof });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update professional" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const deleted = deleteProfessional(id);
    if (!deleted) return NextResponse.json({ error: "Professional not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete professional" }, { status: 500 });
  }
}
