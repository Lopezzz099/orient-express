// Genera los PDF ficticios de public/documentos. Uso: node scripts/generar-documentos.mjs
// Escribe PDF mínimos (una página, Helvetica) sin dependencias externas.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), "public", "documentos");
mkdirSync(outDir, { recursive: true });

const docs = [
  ["resultados-2t-2026.pdf", "Informe de resultados del segundo trimestre de 2026"],
  ["presentacion-institucional-2026.pdf", "Presentación institucional para inversores"],
  ["informe-anual-2025.pdf", "Informe anual 2025"],
  ["estados-financieros-2025.pdf", "Estados financieros consolidados 2025"],
  ["informe-de-sustentabilidad-2025.pdf", "Informe de sustentabilidad 2025"],
  ["codigo-de-conducta.pdf", "Código de conducta"],
];

const escapeText = (s) => s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

function buildPdf(title) {
  const lines = [
    ["F2", 22, 760, title],
    ["F1", 12, 730, "Orient Express S.A. (empresa ficticia)"],
    ["F2", 14, 680, "DOCUMENTO FICTICIO DE DEMOSTRACIÓN"],
    ["F1", 11, 655, "Este archivo forma parte de un sitio de demostración. Orient Express no existe:"],
    ["F1", 11, 640, "sus cifras, personas y documentos son inventados y no tienen validez alguna."],
    ["F1", 11, 600, "No es un informe, una oferta ni una recomendación de inversión."],
  ];
  const stream = lines
    .map(([font, size, y, text]) => `BT /${font} ${size} Tf 56 ${y} Td (${escapeText(text)}) Tj ET`)
    .join("\n");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
    `<< /Length ${Buffer.byteLength(stream, "latin1")} >>\nstream\n${stream}\nendstream`,
  ];
  const chunks = [Buffer.from("%PDF-1.4\n", "latin1")];
  const offsets = [];
  let position = chunks[0].length;
  objects.forEach((body, i) => {
    offsets.push(position);
    const chunk = Buffer.from(`${i + 1} 0 obj\n${body}\nendobj\n`, "latin1");
    chunks.push(chunk);
    position += chunk.length;
  });
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets) xref += `${String(offset).padStart(10, "0")} 00000 n \n`;
  xref += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${position}\n%%EOF\n`;
  chunks.push(Buffer.from(xref, "latin1"));
  return Buffer.concat(chunks);
}

for (const [file, title] of docs) {
  writeFileSync(join(outDir, file), buildPdf(title));
  console.log("generado", file);
}
