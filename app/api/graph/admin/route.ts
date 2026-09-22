import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({
      stats: {
        domains: 13,
        categories: 53,
        vendors: 25,
        products: 104,
        capabilities: 20,
        aliases: 20,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
