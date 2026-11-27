import Link from 'next/link'
import Image from 'next/image'
import { SITE_URL } from '@/lib/seo'

export type GuideEvidence = {
  published: string
  modified: string
  images: { src: string; href: string; alt: string; caption: string }[]
  table: { heading: string; columns: string[]; rows: string[][] }
  sections: { heading: string; paragraph: string }[]
}

export const guideEvidence: Record<string, GuideEvidence> = {
  "crochet-patterns-for-beginners": {
    "published": "2026-10-24",
    "modified": "2026-11-27",
    "images": [
      {
        "src": "/images/catalog/Lion_Flower_Keychain__01.webp",
        "href": "/product/crochet-lion-keychain-pattern-pdf-8-petal-flower-amigurumi-bag-charm",
        "alt": "Crochet lion flower keychain photographed as a completed miniature project",
        "caption": "A small character keychain shows how assembly changes a simple stitch project"
      },
      {
        "src": "/images/catalog/Avocado_Crossbody_Bag__01.webp",
        "href": "/product/avocado-crossbody-bag-crochet-pattern-pdf-fruit-purse-digital-download",
        "alt": "Avocado-shaped crochet crossbody bag in finished project photo",
        "caption": "A shaped bag requires more structure than a flat crochet swatch"
      },
      {
        "src": "/images/catalog/Red_Gold_Baby_Sandals__01.webp",
        "href": "/product/crochet-baby-sandals-pattern-pdf-red-gold-t-strap-shoes-double-sole-and-headband-set",
        "alt": "Red and gold crocheted baby sandals with T-straps and matching headband",
        "caption": "Sized projects depend on gauge and accurate sole measurements"
      }
    ],
    "table": {
      "heading": "US and UK stitch terminology: quick cross-check",
      "columns": [
        "US pattern term",
        "UK term for same stitch",
        "How to recognise it"
      ],
      "rows": [
        [
          "single crochet (sc)",
          "double crochet (dc)",
          "A short basic stitch"
        ],
        [
          "half double crochet (hdc)",
          "half treble crochet (htr)",
          "A height between single and double crochet"
        ],
        [
          "double crochet (dc)",
          "treble crochet (tr)",
          "A taller stitch with additional yarn overs"
        ],
        [
          "slip stitch (sl st)",
          "slip stitch (sl st)",
          "A join or movement stitch"
        ]
      ]
    },
    "sections": [
      {
        "heading": "Decode one instruction before starting a round",
        "paragraph": "Take the instruction '2 sc in next st, sc in next 3 sts' as a reading exercise, not as a universal pattern sequence. In US terminology the first action creates two stitches in one target stitch, adding one stitch to the running count. Each of the next three target stitches receives one stitch. You have worked into four existing positions and created five stitches. If the designer uses UK terms, check the glossary first. Never apply a table of standard abbreviations when the PDF explicitly defines a different special stitch."
      },
      {
        "heading": "Keep the count separate from the shape",
        "paragraph": "A project may use exactly the correct number of stitches but still look uneven because increases are distributed differently. Before an unfamiliar round, read the whole bracketed repeat and mark the points where the piece widens or narrows. If a row says 'repeat five times', count five complete groups rather than five additional stitches. When you finish, compare the total to the checkpoint stated in the file. If the number is wrong, identify the last round that matched instead of compensating randomly on the next round."
      },
      {
        "heading": "Recognise a flat row versus a spiral",
        "paragraph": "Flat crochet rows usually involve turning the work at the end; check whether the turning chain counts as a stitch. Joined rounds have a defined join, often a slip stitch, plus a starting chain specified by the designer. Continuous spirals generally do not close with a join, which means you need a stitch marker at the start of each round. The same shorthand can behave differently in each construction style. For amigurumi, moving the marker one position by mistake can rotate facial details, straps or decorative parts."
      },
      {
        "heading": "Read a stitch repeat accurately",
        "paragraph": "Written instructions use asterisks, brackets and parentheses for different kinds of grouping. A bracketed sequence might mean work one group into the same stitch; an asterisk might mean repeat a longer group across the row. Those conventions are common but not universal. Copy a complicated line to a piece of paper, underline each repeat, and total the starting stitches consumed before lifting the hook. If a repeat does not divide evenly across the available stitches, check the PDF notes for edge stitches rather than forcing another repeat."
      },
      {
        "heading": "Understand hook size and gauge as a pair",
        "paragraph": "Hook sizes are a starting point rather than a guarantee of measurement. Two crocheters using the same yarn can form noticeably different loops; changing the hook influences both the width of the fabric and its firmness. To check gauge, use the pattern's specified stitch pattern, not automatically plain single crochet. Measure a relaxed swatch across the stated number of stitches and rows. If a small accessory is decorative, exact gauge may be less important, but sole length, fitted straps and matching two-sided pieces need more careful measurement."
      },
      {
        "heading": "Choose yarn based on what the object must do",
        "paragraph": "A fluffy plush, a structured handbag and a small keychain have different needs even if all three are crocheted. Plush projects may benefit from a soft surface and controlled stuffing; a purse may require enough body to hold its form; a miniature charm should be durable at the hanging loop. Read fiber, yarn weight, recommended hook, and notions from the actual pattern. Avoid changing fiber and hook size simultaneously at the beginning of a sized project, because you will not know which change caused the gauge difference."
      },
      {
        "heading": "Check finishing and assembly instructions before buying",
        "paragraph": "Beginners often focus on rounds and discover too late that the item also involves a zipper, rigid handle, wire or embroidery. Skim the final assembly pages before starting. Look for named attachment points, whether pieces are sewn through both loops, how ends are secured and whether stuffing happens before the opening is closed. Ask about any omitted construction step before purchasing a PDF if it is essential to the design. Product photographs help with appearance, but they are not a substitute for an explicit assembly sequence."
      },
      {
        "heading": "Use a small testing routine when something feels wrong",
        "paragraph": "For a new pattern, first make a checklist: terminology, materials, gauge, key repeat, expected counts, assembly and finished measurement. Work the first few rows slowly and compare them with the written checkpoints. If the PDF says a round ends with 30 stitches and you count 29, stop there. Review whether a chain counted as a stitch or an increase was missed. When asking for help, report the pattern title, page, exact row and your count. That gives support a reproducible issue rather than a photograph without context."
      }
    ]
  },
  "knitting-patterns-for-beginners": {
    "published": "2026-10-24",
    "modified": "2026-11-27",
    "images": [
      {
        "src": "https://ouvdzdhpinteofjyccfe.supabase.co/storage/v1/object/public/dyasse-product-images/product-catalog/advanced-cable-knit-hat-pattern-lace-charts-folded-brim-beanie-pdf-download/423f35a3cd6e196cd1abe428.jpg",
        "href": "/product/advanced-cable-knit-hat-pattern-lace-charts-folded-brim-beanie-pdf-download",
        "alt": "Cable knit winter hat showing a folded ribbed brim and textured cable work",
        "caption": "Cable patterns need an exact legend and row count"
      },
      {
        "src": "https://ouvdzdhpinteofjyccfe.supabase.co/storage/v1/object/public/dyasse-product-images/product-catalog/cable-knit-scarf-pattern-pdf-easy-textured-winter-scarf/643ac4f34eb7199fe3c62bdb.jpg",
        "href": "/product/cable-knit-scarf-pattern-pdf-easy-textured-winter-scarf",
        "alt": "Textured knitted winter scarf in a finished-design photograph",
        "caption": "Scarf width, edge treatment and repeat are related to gauge"
      },
      {
        "src": "https://ouvdzdhpinteofjyccfe.supabase.co/storage/v1/object/public/dyasse-product-images/product-catalog/cable-knit-headband-pattern-braided-ear-warmer-pdf-for-beginner-knitters/3ba56f4fd22c8ec0abbc5c80.jpg",
        "href": "/product/cable-knit-headband-pattern-braided-ear-warmer-pdf-for-beginner-knitters",
        "alt": "Braided cable knit headband used as a sizing and cable example",
        "caption": "Headband fit also depends on stretch and seam assembly"
      }
    ],
    "table": {
      "heading": "Abbreviations to check before your first repeat",
      "columns": [
        "Term",
        "Meaning",
        "Checkpoint"
      ],
      "rows": [
        [
          "K / P",
          "Knit / purl",
          "Keep track of RS and WS"
        ],
        [
          "K2tog",
          "Knit two stitches together",
          "Consumes two, makes one"
        ],
        [
          "SSK",
          "Slip, slip, knit decrease",
          "Consumes two, makes one"
        ],
        [
          "YO",
          "Yarn over",
          "Creates an extra loop or eyelet"
        ],
        [
          "BO",
          "Bind off",
          "Check tension along final edge"
        ]
      ]
    },
    "sections": [
      {
        "heading": "Trace the stitch balance of a patterned row",
        "paragraph": "Suppose a row starts with 24 live stitches and asks you to work one K2tog and one yarn over, with all other stitches worked normally. K2tog consumes two stitches and creates one, reducing the count by one; the yarn over creates an additional stitch, bringing the total back to 24. A lace row can therefore retain its count while creating a visible eyelet. Do not assume every decrease must be matched by a yarn over; decreases used for shaping intentionally change the stitch total."
      },
      {
        "heading": "Use a row tracker for repeats",
        "paragraph": "A notation such as 'Rows 5–12: repeat Rows 1–4 twice' means eight worked rows, not that all eight rows use identical stitches. On paper, label Row 5 with the action of Row 1, Row 6 with Row 2 and so on. This prevents losing your place after a pause. For a reversible scarf or headband, mark the right-side and wrong-side rows. A counter that advances only after a completed row is more reliable than counting half-finished passes."
      },
      {
        "heading": "Read cable instructions through their legend",
        "paragraph": "Cables depend on both the number of stitches moved and where the held stitches wait. 'Hold in front' often makes a different crossing from 'hold in back'. Designers can abbreviate these moves differently; a C4F in one pattern may not use the same breakdown as a visually similar symbol in another. Work from the chart legend and written directions belonging to that PDF. Before knitting a large section, test one cable repeat on spare yarn and count that the correct number of stitches returns to the working needle."
      },
      {
        "heading": "Measure both stitches and rows in a swatch",
        "paragraph": "A width measurement checks stitch gauge, while length over a series of rows checks row gauge. For a hat, circumference depends strongly on stitches per unit and negative ease; crown height depends on rows and shaping sequence. For a scarf, the same stitch count can produce different widths with different yarn or tension. Wash or rest the swatch as advised by the pattern before comparing. If your row gauge differs, adding random rows can shift cable placements and the intended design."
      },
      {
        "heading": "Plan edges and finishing from the beginning",
        "paragraph": "An edge can curl or flare even when the central stitch pattern is correct. For stockinette a garter or ribbed border may help, depending on construction; it does not guarantee that every yarn will stay completely flat. Check selvedge instructions before knitting, especially if the pattern later asks for a mattress seam or picked-up stitches. Bind-off tension also matters: too tight can pinch the end of a headband and too loose can make a scarf edge wavy. Sample the recommended finish when in doubt."
      },
      {
        "heading": "Choose a pattern that matches your skills",
        "paragraph": "A beginner-friendly hat with plain ribbing, an advanced cable chart and a twisted headband assembly require different kinds of attention. Compare whether the PDF provides both text and chart notation, how many sizes it offers and whether the shaping is explicit. Select one that explains the skills you are still learning, or practise those skills separately first. Before paying, verify that a photographed feature is actually described by the instructions. When a row repeat or finishing step seems inconsistent, note the exact row and contact support."
      }
    ]
  },
  "crochet-keychain-patterns": {
    "published": "2026-10-28",
    "modified": "2026-11-27",
    "images": [
      {
        "src": "/images/catalog/Lion_Flower_Keychain__01.webp",
        "href": "/product/crochet-lion-keychain-pattern-pdf-8-petal-flower-amigurumi-bag-charm",
        "alt": "Miniature crochet lion flower keychain with petal mane",
        "caption": "Small stuffed shapes require secure joins and finishing"
      },
      {
        "src": "/images/catalog/Vintage_Car_Keychain__01.webp",
        "href": "/product/crochet-vintage-car-keychain-pattern-pdf-retro-amigurumi-auto-bag-charm",
        "alt": "Small crocheted vintage car keychain in a finished-product photograph",
        "caption": "A miniature vehicle introduces structural details and hardware"
      },
      {
        "src": "/images/catalog/Coquette_Lace_Heart_Keychain__01.webp",
        "href": "/product/crochet-heart-keychain-pattern-pdf-coquette-lace-amigurumi-bag-charm",
        "alt": "Crocheted lace heart bag charm photographed with its decorative shape",
        "caption": "Flat or shaped charms need different finishing techniques"
      }
    ],
    "table": {
      "heading": "Hardware and finishing checks for a miniature crochet charm",
      "columns": [
        "Part",
        "Question before assembly",
        "Practical caution"
      ],
      "rows": [
        [
          "Split ring",
          "Where does the loop attach?",
          "Keep stress off decorative stitches"
        ],
        [
          "Jump ring",
          "Is the closure fully closed?",
          "Check edges for snagging"
        ],
        [
          "Sewn loop",
          "How is it reinforced?",
          "Hide ends under secure stitches"
        ],
        [
          "Small bead",
          "Can it detach during use?",
          "Not suitable for unsupervised baby play"
        ]
      ]
    },
    "sections": [
      {
        "heading": "Think about the finished use, not just the photograph",
        "paragraph": "A keychain is handled, swung and rubbed against other objects more often than a display ornament. A mini plush may have a rounded shape that catches on a pocket, while a flat heart can sit close to a bag strap. Before choosing the design, decide whether it will be carried daily, attached to a zipper or displayed only. Consider the weight of any metal findings relative to the fabric. An attractive hanging loop does not automatically mean it is reinforced for heavy keys."
      },
      {
        "heading": "Match the pattern's yarn and hardware notes",
        "paragraph": "Thicker yarn can enlarge a keychain, and a much thinner hook may make stuffing difficult even if it creates dense stitches. Check the materials list for the actual yarn weight, hook, stuffing, tapestry needle and hardware. Some projects need a split ring only; others ask for jump rings, cord or wire. Do not infer exact hook sizes from a finished photo. If an item uses safety eyes, check when they are inserted and whether the design is appropriate for its intended recipient."
      },
      {
        "heading": "Test the strength of an attachment point",
        "paragraph": "A fabric loop sewn to one weak stitch can tear after repeated pulling. Read where the pattern anchors the loop, then follow any instruction to sew through several stitches or reinforce the join. After closing the piece, inspect the stitching on both sides. A decorative embroidery thread is not necessarily suitable for bearing the weight of keys. If the PDF does not describe the join, contact the seller rather than improvising a potentially fragile connection on a product meant for daily use."
      },
      {
        "heading": "Miniature shaping makes every count visible",
        "paragraph": "On a tiny car, flower or animal, a difference of one stitch can change the silhouette more noticeably than it would on a larger blanket. Work in good light, mark round starts and compare symmetrical parts as you go. When building a pair of wheels or ears, count them both before attaching either. Before closing a stuffed form, check whether facial details have a reference centre line. The instructions should tell you the spacing; if they do not, a single photo cannot determine an exact stitch position."
      },
      {
        "heading": "Plan finishing time as part of project time",
        "paragraph": "A charm with several colours may crochet quickly but require careful sewing, hiding yarn ends, embroidering details and attaching hardware. Treat those as construction steps, not afterthoughts. Arrange the separate parts and compare them with the design photo before sewing them permanently. Check that knots and wire ends cannot scratch or snag. If the finished item will be a gift, include care guidance relevant to the materials and avoid describing a decorative keychain as a certified toy."
      },
      {
        "heading": "Pick small projects for confidence, not arbitrary difficulty",
        "paragraph": "A flat strip wristlet uses repetitive rows and a strong closing method; a spherical charm introduces increases, decreases and stuffing; a miniature vehicle may combine several little components. The apparent size of the finished object is not the same as its difficulty. Compare the number of separate pieces, colour changes and final hardware operations. A good first keychain lets you practise one new technique at a time. Choose a PDF whose materials, stitch notation and assembly sequence you can check before starting."
      }
    ]
  },
  "choosing-yarn-for-crochet-bags": {
    "published": "2026-10-28",
    "modified": "2026-11-27",
    "images": [
      {
        "src": "/images/catalog/Avocado_Crossbody_Bag__01.webp",
        "href": "/product/avocado-crossbody-bag-crochet-pattern-pdf-fruit-purse-digital-download",
        "alt": "Avocado-shaped crocheted handbag showing a structured fabric body",
        "caption": "A shaped crossbody bag highlights the need to consider stiffness"
      },
      {
        "src": "/images/catalog/Avocado_Crossbody_Bag__02.webp",
        "href": "/product/avocado-crossbody-bag-crochet-pattern-pdf-fruit-purse-digital-download",
        "alt": "Additional detail photo of the avocado crochet crossbody bag",
        "caption": "Compare an alternate view before choosing yarn or straps"
      },
      {
        "src": "/images/catalog/Penguin_Coin_Purse__01.webp",
        "href": "/product/penguin-coin-purse-crochet-pattern-pdf",
        "alt": "Small penguin crochet coin purse with contrasting face detail",
        "caption": "A small purse can have very different shaping and closure needs"
      }
    ],
    "table": {
      "heading": "Material characteristics worth testing with a bag swatch",
      "columns": [
        "Yarn construction",
        "Likely behaviour to evaluate",
        "Useful test"
      ],
      "rows": [
        [
          "Cotton cord",
          "Firmness and stitch definition",
          "Fold and load a swatch"
        ],
        [
          "T-shirt or tube yarn",
          "Bulk and recovery",
          "Measure stretch after handling"
        ],
        [
          "Soft twisted yarn",
          "Drape and distortion",
          "Check shape under weight"
        ],
        [
          "Raffia-like yarn",
          "Rigidity and abrasion",
          "Test bend and edge finish"
        ]
      ]
    },
    "sections": [
      {
        "heading": "Start with the structure the design needs",
        "paragraph": "A tote that carries books, a small clutch and a decorative bag may all use single crochet but must behave differently in use. If the pattern relies on a rigid base or precisely fitted handle slots, the fabric needs to hold its measured form. If the design is deliberately soft, excessive stiffness can change its drape. Read the PDF for the fibre, yarn weight, hook and finished dimensions before substituting. A product photograph tells you how one sample looked, not how every yarn will perform."
      },
      {
        "heading": "Compare swatches, not labels alone",
        "paragraph": "Two skeins marked bulky can have different surface texture, strand structure and elasticity. Crochet a sample in the stitch actually used by the bag, then measure its width and height, fold it and hang a small weight from its edge to see what changes. Note whether the fabric recovers after a short rest. This is a comparison test rather than a certified load test: it helps reveal how substitutions might affect the bag before you invest in enough yarn for the whole project."
      },
      {
        "heading": "Count the base before measuring the body",
        "paragraph": "The foundation and early increases determine the usable footprint of many crochet bags. If your base is wider than the pattern's measurement, following every subsequent row can still produce a bag too large for the intended handles or lining. Work the base and compare the exact stitch count and dimensions with the instructions. For rectangular bases, measure both length and width; for rounded bases, measure the longest dimension. Adjust only where the pattern permits rather than silently removing stitches from a repeat."
      },
      {
        "heading": "Select straps and handles as a system",
        "paragraph": "A strap made of the same soft yarn as the bag body may elongate under load. A rigid circular handle instead transfers weight into a small attachment area. Read how the designer reinforces these points, whether a lining is optional and how many stitches are reserved for each handle. Metal rings, zipper tape and magnetic closures also have real dimensions, so obtain the required sizes before completing the edge. An improvised attachment can make a good crochet body uncomfortable or impractical to use."
      },
      {
        "heading": "Consider fabric care before mixing materials",
        "paragraph": "Cotton cord and blended yarns can react differently to washing, moisture and daily friction. A bag combining a crocheted body with wooden handles, metal rings or a fabric lining may need more delicate care than the yarn label suggests. Check the materials' individual care instructions and avoid soaking components that are not designed for it. Colourfastness is particularly important for bags worn against light-coloured clothes. Test a small leftover sample rather than promising that an untested colour combination will never transfer."
      },
      {
        "heading": "Make buying decisions with your actual pattern open",
        "paragraph": "A strong listing separates the creative appearance from technical necessities. Before checkout, identify the project format, recommended yarn, hook, size, hardware and whether the shown embellishments are included in the written instructions. Keep a materials checklist next to the PDF and cross off required supplies before casting the first chain. If the listed gauge or attachment method is missing, ask a specific question before purchasing a large amount of cord or special handles. The free guide is orientation; the individual pattern remains authoritative."
      }
    ]
  },
  "crochet-baby-shoes-sizing": {
    "published": "2026-10-28",
    "modified": "2026-11-27",
    "images": [
      {
        "src": "/images/catalog/Cow_Baby_Booties__01.webp",
        "href": "/product/crochet-cow-baby-booties-pattern-pdf-newborn-farm-animal-shoes-0-3-month-tutorial",
        "alt": "Cow-themed crocheted baby booties for a newborn-size project",
        "caption": "Decorative baby shoes require special attention to loose parts"
      },
      {
        "src": "/images/catalog/Red_Gold_Baby_Sandals__01.webp",
        "href": "/product/crochet-baby-sandals-pattern-pdf-red-gold-t-strap-shoes-double-sole-and-headband-set",
        "alt": "Crocheted red and gold baby sandals with T-straps",
        "caption": "Double sole and strap construction need matching measurements"
      },
      {
        "src": "/images/catalog/Red_Gold_Baby_Sandals__02.webp",
        "href": "/product/crochet-baby-sandals-pattern-pdf-red-gold-t-strap-shoes-double-sole-and-headband-set",
        "alt": "Second view of red and gold crocheted baby sandals",
        "caption": "Compare paired shoes before completing decorative finishing"
      }
    ],
    "table": {
      "heading": "A measurement worksheet (not a universal age-to-size conversion)",
      "columns": [
        "Check",
        "Record from pattern or foot",
        "Why it matters"
      ],
      "rows": [
        [
          "Foot length",
          "Measured heel to longest toe",
          "Age labels alone cannot verify fit"
        ],
        [
          "Finished sole length",
          "Measured flat after first sole",
          "Tension may change the result"
        ],
        [
          "Finished width",
          "Measured at widest sole point",
          "Two feet and styles differ"
        ],
        [
          "Strap placement",
          "Counted from the actual PDF",
          "Prevent uneven or overly tight openings"
        ],
        [
          "Decorative parts",
          "Securely attached or omitted",
          "Avoid loose small components"
        ]
      ]
    },
    "sections": [
      {
        "heading": "Age range is a label, not a measured fit",
        "paragraph": "A pattern described as newborn or zero to three months gives the intended general size, but children do not grow to exactly the same foot length at the same age. If you are making footwear for a real baby, start with a careful measurement and the finished measurements published in the specific pattern. If the file gives only an age range and no usable dimensions, ask the designer for clarification before treating the result as size-accurate. Do not substitute a generic online chart for the actual design's measurement notes."
      },
      {
        "heading": "Measure a foot without pulling or pressing",
        "paragraph": "When taking a length measurement, rest the foot gently and measure from the back of the heel to the longest toe, rather than tracing tightly around curled toes. Record the approximate length in centimetres and repeat if the baby moves. Consider the intended purpose: soft decorative prewalker footwear is not the same as structured walking shoes. A snug decorative strap should not restrict the foot. If you cannot get a reliable measurement, choose a design with stated finished dimensions and plan to check the fit before use."
      },
      {
        "heading": "Make both soles with the same method",
        "paragraph": "Crochet soles often begin with an oval foundation chain and increases around the ends. The pattern controls shape through both the stitch count and where those increases sit. Work the first sole carefully, count the stitches after every round and measure the finished base. Before moving to the upper, make a second sole and compare width and length. Unequal tension or a missed increase may produce two different footprints even when the same yarn is used. Fix that difference now instead of hoping straps will disguise it."
      },
      {
        "heading": "Use gauge when shaping must align",
        "paragraph": "If the designer specifies a gauge swatch, make one in the recommended yarn and stitch. When the gauge is absent, measure the actual sole against the pattern's stated result and document the hook and yarn you used. A change in hook can alter the shape of toe caps and straps, not merely the sole length. If your base is consistently too large, don't remove arbitrary stitches from the upper: doing so can shift the toe seam or buckle attachment and make the written instructions inconsistent with the piece."
      },
      {
        "heading": "Check toe shaping before sewing",
        "paragraph": "Toe fronts can be constructed with decreases, short rows or separate pieces sewn onto the sole. Read the assembly section before joining the toe, and identify which sole stitches correspond to the front centre and each side. If the PDF includes stitch markers or a seam map, keep those markers in place until the seam is secure. Before tightening yarn ends, compare the left and right shoes from above. A confusing stitch-to-stitch mapping is a valid reason to ask for help; it is not something you should have to guess."
      },
      {
        "heading": "Treat straps and ornaments as separate safety checks",
        "paragraph": "A baby sandal may use a T-strap, crossover band, tie or decorative bow. Each should be assembled as the pattern instructs and checked for loose ends and excessive tightness. Beads, detachable charms and small rigid pieces can create choking hazards, so decorative footwear should not be treated as an unsupervised toy. Crochet shoes are not a replacement for protective footwear when a child starts walking outdoors. Follow age-appropriate safety advice and remove the item if it becomes loose or uncomfortable."
      },
      {
        "heading": "Recognise what a photograph cannot prove",
        "paragraph": "A product image can show colour, toe shape and visible embellishments, but it cannot establish gauge, exact finished dimensions or a secure seam. Review the material list and the construction overview in the PDF where accessible. For multi-size products, mark the size-specific stitch counts before you begin and ensure every row refers to the correct column. If a pattern shows a close-up of only one size, do not assume all sizes use identical placement. Ask for a corrected diagram or instruction when a joining sequence is ambiguous."
      },
      {
        "heading": "Check fit and keep a useful record",
        "paragraph": "After finishing both shoes, check the opening, sole length, strap flexibility and whether the left and right pieces match. Avoid tight closures and remove any hard decorations that are not suitable for the intended use. Record the yarn brand, hook, finished measurements and any deliberate substitutions; this helps if you make a matching pair later or seek technical support. When contacting Dyasse, include the pattern name, page, row or round and a clear description of the exact step that is unclear, without sending private child information."
      }
    ]
  }
}

export function GuideDeepDive({slug}:{slug:string}) {
  const guide = guideEvidence[slug]
  if (!guide) return null
  return <section aria-label="Additional practical guide reference" className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
    <div className="border-t border-[#D7E9F1] pt-12">
      <h2 className="font-serif text-3xl text-[#172231]">Practical reference and examples</h2>
      <p className="mt-3 text-sm leading-7 text-[#536879]">Examples are for learning and comparison. The instructions and measurements of the specific PDF always take priority.</p>
      <div className="mt-9 grid gap-8 lg:grid-cols-2">
        {guide.sections.map(section=><section key={section.heading}>
          <h3 className="font-serif text-2xl text-[#273B50]">{section.heading}</h3>
          <p className="mt-3 text-[15px] leading-8 text-[#4F6575]">{section.paragraph}</p>
        </section>)}
      </div>
      <div className="mt-12 overflow-x-auto rounded-lg border border-[#D7E5ED]">
        <table className="w-full min-w-[580px] border-collapse text-left text-sm text-[#344D5F]">
          <caption className="bg-[#ECF6FC] px-5 py-4 text-left font-bold text-[#1C3348]">{guide.table.heading}</caption>
          <thead><tr>{guide.table.columns.map(name=><th key={name} scope="col" className="border-b border-[#D7E5ED] px-5 py-3 font-bold">{name}</th>)}</tr></thead>
          <tbody>{guide.table.rows.map((row,i)=><tr key={i} className={i%2===0?'bg-white':'bg-[#F7FBFD]'}>{row.map((cell,j)=><td key={j} className="border-b border-[#E5EDF2] px-5 py-4 align-top">{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <h2 className="mt-12 font-serif text-3xl text-[#172231]">Related project photographs</h2>
      <p className="mt-3 text-sm leading-7 text-[#536879]">These are examples of released patterns, not step-by-step photographs for the guide.</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {guide.images.map(item=><figure key={item.src} className="overflow-hidden rounded-lg border border-[#D7E5ED] bg-white">
          <Link href={item.href} className="block">
            <Image src={item.src} alt={item.alt} width={640} height={560} sizes="(min-width:1024px) 30vw,(min-width:640px) 45vw,90vw" className="aspect-[6/5] w-full object-cover"/>
            <figcaption className="p-4 text-sm leading-6 text-[#344D5F]">{item.caption}</figcaption>
          </Link>
        </figure>)}
      </div>
      <p className="mt-10 border-t border-[#D7E5ED] pt-5 text-sm text-[#526879]">
        Prepared by <Link href="/about" className="font-semibold text-[#781D35] underline">Dyasse Shop</Link>.
        {' '}First recorded guide version: <time dateTime={guide.published}>{guide.published}</time>.
        {' '}Last content update: <time dateTime={guide.modified}>{guide.modified}</time>.
        For corrections, use <Link href="/contact" className="font-semibold text-[#781D35] underline">contact and support</Link>.
      </p>
    </div>
  </section>
}

export function guideImagesForSchema(slug:string) {
  return (guideEvidence[slug]?.images ?? []).map(item=>item.src.startsWith('/') ? SITE_URL + item.src : item.src)
}
