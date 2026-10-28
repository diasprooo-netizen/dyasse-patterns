import type { Metadata } from 'next'
import { EditorialGuide, type GuideLink, type GuideSection } from '@/components/editorial-guide'

export const metadata: Metadata = {
  title: "Crochet Baby Shoes: Sizing, Gauge & Safety Before You Start",
  description: "How to approach crochet baby booties and prewalker shoe PDF patterns: read the size range, check gauge and take care with straps and decorations.",
  alternates: { canonical: '/guides/crochet-baby-shoes-sizing' },
  openGraph: { type: 'article', title: "Crochet Baby Shoes: Sizing, Gauge & Safety Before You Start", description: "How to approach crochet baby booties and prewalker shoe PDF patterns: read the size range, check gauge and take care with straps and decorations.", url: '/guides/crochet-baby-shoes-sizing' },
}
const sections: GuideSection[] = [
  {
    "title": "Age ranges are a starting point, not a measurement",
    "paragraphs": [
      "Crochet baby-shoe patterns often describe an intended age range, but babies of the same age do not always have the same foot length. If you are making a gift, seek a current foot measurement where possible, then compare it with the finished dimensions provided in the actual pattern.",
      "Dyasse Shop currently offers a Watermelon Baby Mary Jane crochet PDF for a 0–3 month prewalker design. That age range describes the intended size category, not a guaranteed fit for every baby. Do not infer shoe length from the age label alone."
    ]
  },
  {
    "title": "Check the sole and the gauge first",
    "paragraphs": [
      "The sole provides the foundation for the width and length of a crocheted prewalker shoe. If you change yarn thickness or hook size, the sole dimensions can change even if you follow the same stitch counts. Gauge and tension are therefore especially important with small footwear.",
      "Before proceeding to the upper, measure the sole and compare it with the written instructions for that exact design. Count your increases and decreases and make both soles under similar tension. Where the pattern offers checkpoints, use them before attaching straps or decorative parts."
    ]
  },
  {
    "title": "Understand straps, buttons and decorative details",
    "paragraphs": [
      "A Mary Jane design can include a narrow strap and decorative elements. The Watermelon Baby Mary Jane pattern uses a coral upper, green-and-white rind-inspired sole details, seed embroidery and button straps. Follow the PDF's placement and finishing instructions for the particular parts described.",
      "Baby items need extra care with anything that might come loose. Inspect stitches, closures and decorations; avoid unsecured beads or other detachable components, and never let a baby sleep unattended in decorative footwear. A crocheted prewalker is not a substitute for protective walking shoes."
    ]
  },
  {
    "title": "Before you buy the PDF or start crocheting",
    "paragraphs": [
      "Read the product description to confirm you are purchasing digital instructions rather than finished shoes. Check the required yarn, hook and finishing materials, along with terminology and construction method. For a gift, also check whether the recipient wants prewalker footwear and whether the finished style suits their needs."
    ],
    "bullets": [
      "Confirm the intended age range and any finished dimensions shown for the design.",
      "Measure and compare the first sole before making the second shoe.",
      "Check buttons, embroidery and any removable decoration for security.",
      "Follow the pattern's own gauge, stitch counts and assembly order."
    ]
  },
  {
    "title": "Where to find the right instructions",
    "paragraphs": [
      "The Dyasse Shop baby-footwear collection links to the currently released digital pattern. For help with US crochet terminology, turning rows and increases, the free crochet-pattern reading guide explains the basics before you begin."
    ]
  }
]
const related: GuideLink[] = [
  {
    "href": "/collections/baby-shoes",
    "label": "Crochet baby shoes patterns",
    "context": "View the currently available prewalker PDF pattern."
  },
  {
    "href": "/product/watermelon-baby-mary-jane-crochet-pattern-03-month-prewalker-shoes-pdf",
    "label": "Watermelon Mary Jane PDF",
    "context": "0–3 month crochet prewalker design with button straps and seed embroidery."
  },
  {
    "href": "/guides/crochet-patterns-for-beginners",
    "label": "Crochet abbreviations guide",
    "context": "Learn to follow stitch counts and common US crochet terms."
  }
]

export default function GuidePage() {
  return <EditorialGuide slug="crochet-baby-shoes-sizing" title="Crochet Baby Shoes: Sizing, Gauge & Safety Before You Start" description="How to approach crochet baby booties and prewalker shoe PDF patterns: read the size range, check gauge and take care with straps and decorations." eyebrow="BABY SHOE PATTERN GUIDE" sections={sections} related={related}/>
}
