import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outputPath = resolve(rootDir, 'public/davide-fornelli-cv.pdf')

const lines = [
  { text: 'Davide Fornelli', x: 72, y: 744, size: 24 },
  { text: 'Bari, Italy', x: 72, y: 718, size: 14 },
  { text: 'CS student at UNIBA. Full-stack developer at Deloitte.', x: 72, y: 696, size: 12 },
  { text: 'Running in my free time.', x: 72, y: 678, size: 12 },
  { text: 'Education', x: 72, y: 636, size: 16 },
  { text: 'UNIBA | Computer Science', x: 72, y: 616, size: 12 },
  { text: 'Skills', x: 72, y: 576, size: 16 },
  { text: 'HTML, JavaScript, TypeScript, CSS, C, C++', x: 72, y: 556, size: 12 },
  { text: 'Projects', x: 72, y: 516, size: 16 },
  { text: 'Sudoku | 08/25 - 08/25', x: 72, y: 496, size: 12 },
  { text: 'Terminal sudoku game in C', x: 92, y: 480, size: 12 },
  { text: 'No Screenshot | 08/25 - 08/25', x: 72, y: 454, size: 12 },
  { text: "A word that can't be screenshotted", x: 92, y: 438, size: 12 },
  { text: 'Boid Flock | 08/25 - 08/25', x: 72, y: 412, size: 12 },
  { text: 'Boids algorithm with interactive controls', x: 92, y: 396, size: 12 },
  { text: 'Contact', x: 72, y: 356, size: 16 },
  { text: 'fornelli.dv@gmail.com', x: 72, y: 336, size: 12 }
]

const escapePdfText = (text) => text.replaceAll('\\', '\\\\').replaceAll('(', '\\(').replaceAll(')', '\\)')

const content = lines
  .map(
    ({ text, x, y, size }) =>
      `BT\n/F1 ${size} Tf\n1 0 0 1 ${x} ${y} Tm\n(${escapePdfText(text)}) Tj\nET`
  )
  .join('\n')

const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
  `<< /Length ${Buffer.byteLength(content, 'utf8')} >>\nstream\n${content}\nendstream`,
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'
]

let pdf = '%PDF-1.4\n'
const offsets = [0]

for (const [index, object] of objects.entries()) {
  offsets.push(Buffer.byteLength(pdf, 'utf8'))
  pdf += `${index + 1} 0 obj\n${object}\nendobj\n`
}

const xrefOffset = Buffer.byteLength(pdf, 'utf8')

pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`

for (let index = 1; index <= objects.length; index += 1) {
  pdf += `${String(offsets[index]).padStart(10, '0')} 00000 n \n`
}

pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`

mkdirSync(dirname(outputPath), { recursive: true })
writeFileSync(outputPath, pdf, 'utf8')
