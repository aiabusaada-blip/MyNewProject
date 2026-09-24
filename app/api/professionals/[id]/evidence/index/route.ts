// API: Evidence CRUD (linked to professionals and capabilities)
import { NextRequest, NextResponse } from "next/server";
import {
  getEvidenceById, getProfessionalEvidence, getCapabilityEvidence,
  addEvidence, updateEvidence, deleteEvidence,
} from "@/lib/graph/professionals-data";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const evs = getProfessionalEvidence(id);
    return NextResponse.json({ evidences: evs });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch evidence" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    if (!body.title || !body.type || !body.description) {
      return NextResponse.json(
        { error: "Missing required fields: title, type, description" },
        { status: 400 }
      );
    }
    const validTypes = ["project", "certificate", "reference", "portfolio", "assessment", "other"];
    if (!validTypes.includes(body.type)) {
      return NextResponse.json({ error: `Invalid evidence type. Must be one of: ${validTypes.join(", ")}` }, { status: 400 });
    }
    const ev = addEvidence({ ...body, professional_id: id } as any);
    return NextResponse.json({ evidence: ev }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to add evidence" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const evidenceId = body.evidence_id || body.id;
    if (!evidenceId) {
      return NextResponse.json({ error: "evidence_id or id is required in the request body" }, { status: 400 });
    }
    const ev = updateEvidence(evidenceId, body as any);
    if (!ev) return NextResponse.json({ error: "Evidence not found" }, { status: 404 });
    if (ev.professional_id !== id) {
      return NextResponse.json({ error: "Evidence does not belong to this professional" }, { status: 403 });
    }
    return NextResponse.json({ evidence: ev });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update evidence" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await _req.json().catch(() => ({}));
    const evidenceId = body.evidence_id || body.id;
    if (!evidenceId) {
      return NextResponse.json({ error: "evidence_id or id is required in the request body" }, { status: 400 });
    }
    const ev = getEvidenceById(evidenceId);
    if (!ev) return NextResponse.json({ error: "Evidence not found" }, { status: 404 });
    if (ev.professional_id !== id) {
      return NextResponse.json({ error: "Evidence does not belong to this professional" }, { status: 403 });
    }
    const deleted = deleteEvidence(evidenceId);
    return NextResponse.json({ success: deleted });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete evidence" }, { status: 500 });
  }
}
