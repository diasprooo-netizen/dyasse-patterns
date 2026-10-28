type Block = { kind: 'heading' | 'paragraph' | 'bullet-list'; text?: string; items?: string[] }

function cleanLine(value: string): string {
  return value.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim()
}

function isSectionHeading(line: string): boolean {
  const plain = line.replace(/^[^\p{L}\p{N}]+/u, '').replace(/[^\p{L}\p{N}]+$/u, '').trim()
  if (plain.length < 4 || plain.length > 45 || !/[A-Z]/.test(plain)) return false
  if (/[.!?]$/.test(plain)) return false
  return plain === plain.toUpperCase() && /[A-Z]{3,}/.test(plain)
}

function blocksFromDescription(description: string): Block[] {
  const blocks: Block[] = []
  const paragraphs: string[] = []
  const bullets: string[] = []
  const flushParagraph = () => {
    if (paragraphs.length) blocks.push({ kind: 'paragraph', text: paragraphs.join(' ') })
    paragraphs.length = 0
  }
  const flushBullets = () => {
    if (bullets.length) blocks.push({ kind: 'bullet-list', items: [...bullets] })
    bullets.length = 0
  }

  for (const raw of description.split(/\r?\n/)) {
    const line = cleanLine(raw)
    if (!line) {
      flushParagraph()
      flushBullets()
      continue
    }
    if (/^(?:[•●]|-\s|\*\s)/.test(line)) {
      flushParagraph()
      bullets.push(line.replace(/^(?:[•●]\s*|-\s+|\*\s+)/, '').trim())
      continue
    }
    if (isSectionHeading(line)) {
      flushParagraph()
      flushBullets()
      blocks.push({ kind: 'heading', text: line.replace(/^[^\p{L}\p{N}]+/u, '').trim() })
      continue
    }
    flushBullets()
    paragraphs.push(line)
  }
  flushParagraph()
  flushBullets()
  return blocks
}

/**
 * Render the seller's original product copy as accessible headings, paragraphs
 * and lists. Wording and disclosure details are deliberately preserved.
 */
export function ProductDescription({ description }: { description: string }) {
  const blocks = blocksFromDescription(description)
  return <div className="mt-5 space-y-4 text-[15px] leading-8 text-[#65717A]">
    {blocks.map((block, i) => {
      if (block.kind === 'heading') return <h4 key={i} className="pt-3 text-base font-bold tracking-[.01em] text-[#283A4A]">{block.text}</h4>
      if (block.kind === 'bullet-list') return <ul key={i} className="list-disc space-y-1 pl-5 marker:text-[#781D35]">
        {block.items?.map((item,j) => <li key={j} className="pl-1">{item}</li>)}
      </ul>
      return <p key={i} className="break-words">{block.text}</p>
    })}
  </div>
}
