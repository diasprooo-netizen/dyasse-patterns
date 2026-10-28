import type { Metadata } from 'next'
import { EditorialGuide, type GuideLink, type GuideSection } from '@/components/editorial-guide'

export const metadata: Metadata = {
  title: "Choosing Yarn for Crochet Bags: Structure, Gauge & Handles",
  description: "Understand what to check before choosing yarn for a crochet handbag, backpack or pouch, with practical examples from Dyasse Shop PDF bag patterns.",
  alternates: { canonical: '/guides/choosing-yarn-for-crochet-bags' },
  openGraph: { type: 'article', title: "Choosing Yarn for Crochet Bags: Structure, Gauge & Handles", description: "Understand what to check before choosing yarn for a crochet handbag, backpack or pouch, with practical examples from Dyasse Shop PDF bag patterns.", url: '/guides/choosing-yarn-for-crochet-bags' },
}
const sections: GuideSection[] = [
  {
    "title": "Choose the yarn for the bag's construction",
    "paragraphs": [
      "A crochet bag must hold its shape, carry its own weight and suit the handle or closure specified by its pattern. Those requirements are different from choosing a soft draping yarn for a scarf. Before buying yarn, read the exact weight, fiber, quantity and hook information supplied with the pattern you plan to make.",
      "For example, the Cocoa Bobble Handbag design specifies super bulky cotton tube yarn or T-shirt yarn, while the gray raised-diagonal handbag calls for firm bulky cotton cord. These are project-specific materials. Substituting one for the other without checking gauge may change the base size, texture, stiffness and fit of the handles."
    ]
  },
  {
    "title": "Yarn weight is only part of the decision",
    "paragraphs": [
      "Two yarns labeled with a similar weight can still behave differently because of their construction, surface texture and elasticity. Cotton cord, knitted tube yarn and a softly twisted yarn can produce noticeably different fabric even when the same hook is used.",
      "To assess a substitute, work a small sample in the same stitch pattern, then compare stitch count, dimensions and how the fabric bends. A flatter swatch may not reveal how a full bag will hang under load, so be cautious about replacing a stiff cord with a soft yarn for a structured design."
    ]
  },
  {
    "title": "Gauge controls more than width",
    "paragraphs": [
      "Gauge describes the relationship between your stitches and physical measurements. For bags, it affects the footprint of the base, body height, flap position and placement of hardware. If your crochet fabric is looser than the pattern expects, a rectangular base can become wider and a fitted handle may no longer align.",
      "Make the gauge swatch called for by your chosen PDF. If it differs, change hook size or yarn cautiously and measure again. When a pattern uses a fixed stitch or bobble placement diagram, keep the stitch counts intact unless the instructions explicitly explain an adjustment."
    ]
  },
  {
    "title": "Handles, straps and closures",
    "paragraphs": [
      "A handbag with rigid handles needs a different attachment method from a drawstring backpack. The Cocoa Bobble Handbag uses two D-shaped handles and reinforced attachment instructions; the floral Sunshine Daisy Backpack uses a drawstring and shoulder straps. The cherry pencil case uses a zipper. These are reasons to examine hardware before you purchase supplies, not details to improvise at the end.",
      "Check the specified handle slot width, stitch positions, reinforcement pieces, zipper length or strap construction for the exact design. Where the PDF describes optional lining or a magnetic snap, distinguish optional finishing from parts needed for structural strength."
    ],
    "bullets": [
      "Confirm the yarn and hook together; do not select either in isolation.",
      "Buy the right hardware after reading the materials page.",
      "Use the pattern's measurements and swatch to evaluate substitutions.",
      "Reinforce carrying points following the documented construction."
    ]
  },
  {
    "title": "Pick a design that suits the materials you have",
    "paragraphs": [
      "If you want pronounced bobble texture and rigid statement handles, compare the Cocoa Bobble Handbag. If you prefer raised diagonal texture with a flap and shoulder strap, look at the Gray Raised Diagonal Handbag. For a cheerful yellow drawstring style, explore Sunshine Daisy Backpack. For a small stationery pouch, the Cherry Crochet Pencil Case combines crochet with zipper construction.",
      "These descriptions refer to different projects, not interchangeable material recipes. Each downloadable pattern includes its own design details; the yarn and hardware are purchased separately."
    ]
  }
]
const related: GuideLink[] = [
  {
    "href": "/collections/crochet-bags",
    "label": "Crochet bag PDF patterns",
    "context": "See the four released handbag, backpack and pouch designs."
  },
  {
    "href": "/product/cocoa-bobble-handbag-crochet-pattern-pdf-chunky-tube-yarn-purse-with-d-shaped-handles",
    "label": "Cocoa bobble handbag",
    "context": "Chunky tube yarn with D-shaped handle construction."
  },
  {
    "href": "/product/gray-raised-diagonal-crochet-handbag-pattern-pdf-flower-shoulder-bag",
    "label": "Gray diagonal handbag",
    "context": "Firm bulky cotton cord and a structured body."
  },
  {
    "href": "/product/sunshine-daisy-crochet-backpack-pattern-pdf-floral-drawstring-bag-tutorial-digital-download",
    "label": "Sunshine daisy backpack",
    "context": "Yellow crochet backpack with floral appliques and drawstring."
  },
  {
    "href": "/product/crochet-pencil-case-pattern-pdf-pastel-cherry-zipper-pouch-tutorial-beginner-friendly",
    "label": "Cherry zipper pencil case",
    "context": "Crochet pouch with zipper closure and cherry detailing."
  }
]

export default function GuidePage() {
  return <EditorialGuide slug="choosing-yarn-for-crochet-bags" title="Choosing Yarn for Crochet Bags: Structure, Gauge & Handles" description="Understand what to check before choosing yarn for a crochet handbag, backpack or pouch, with practical examples from Dyasse Shop PDF bag patterns." eyebrow="CROCHET BAG MATERIALS GUIDE" sections={sections} related={related}/>
}
