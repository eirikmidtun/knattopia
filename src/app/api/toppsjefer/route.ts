import { NextResponse } from "next/server";
import { hentToppsjefer, leggTilToppsjef, rens } from "@/lib/store";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({ toppsjefer: hentToppsjefer() });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { navn?: unknown; totaltTjent?: unknown; razziaer?: unknown }
    | null;
  const navn = rens(body?.navn, 30);
  const totaltTjent = Number(body?.totaltTjent);
  const razziaer = Number(body?.razziaer ?? 0);
  if (!navn) return NextResponse.json({ feil: "Toppsjefen må ha et navn." }, { status: 400 });
  if (!Number.isFinite(totaltTjent) || totaltTjent < 0 || totaltTjent > 1e18) {
    return NextResponse.json({ feil: "Regnskapet ser … kreativt ut." }, { status: 400 });
  }
  const sjef = leggTilToppsjef(navn, totaltTjent, Number.isFinite(razziaer) ? Math.max(0, Math.floor(razziaer)) : 0);
  return NextResponse.json({ sjef, toppsjefer: hentToppsjefer() }, { status: 201 });
}
