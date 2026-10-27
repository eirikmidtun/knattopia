import { NextResponse } from "next/server";
import { hentTips, leggTilTips, rens } from "@/lib/store";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({ tips: hentTips() });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { kodenavn?: unknown; tekst?: unknown } | null;
  const tekst = rens(body?.tekst, 280);
  const kodenavn = rens(body?.kodenavn, 40);
  if (tekst.length < 5) {
    return NextResponse.json({ feil: "Tipset er for kort. Selv DE skriver lengre enn det." }, { status: 400 });
  }
  return NextResponse.json({ tips: leggTilTips(kodenavn, tekst) }, { status: 201 });
}
