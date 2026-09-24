// API: List all professionals (public — respects privacy settings in Phase 4)
import { NextResponse } from "next/server";
import { getAllProfessionals, getProfessionalById } from "@/lib/graph/professionals-data";

export async function GET(_req: Request) {
  try {
    const profs = getAllProfessionals();
    return NextResponse.json({ professionals: profs });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch professionals" }, { status: 500 });
  }
}
