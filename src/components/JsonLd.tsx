/** Strukturerte data (schema.org) som JSON-LD. «<» escapes så innholdet ikke kan lukke script-taggen. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
