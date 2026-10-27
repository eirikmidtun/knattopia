import type { Metadata } from "next";
import { Knattoperium } from "@/components/Knattoperium";

export const metadata: Metadata = {
  title: "Knattoperium",
  description: "Idle-spill der du styrer det oppdiktede Big Knatt Corp. Satire.",
};

export default function KnattoperiumSide() {
  return (
    <main className="ramme">
      <Knattoperium />
    </main>
  );
}
