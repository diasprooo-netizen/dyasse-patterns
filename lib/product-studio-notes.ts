/**
 * Hand-edited notes for identifiable flagship designs. Each entry is grounded
 * in the existing design description, never in invented testing or reviews.
 * Do not auto-generate similar paragraphs for every catalog item.
 */
export type StudioNote = {
  introduction: string
  checkBeforeBuying: readonly string[]
  questions: readonly { question: string; answer: string }[]
}

const notes: Record<string, StudioNote> = {
  'christmas-tree-keychain-crochet-pattern-pdf-mini-holiday-tree-ornament-festive-crochet-pattern': {
    introduction: 'The interest in this little tree comes from its silhouette: a compact stuffed centre with four scalloped tiers, a contrasting trunk and a star at the tip. The ornaments are optional, so the same base can look simple or festive. Before choosing colours, consider where you want to use it: a keyring needs a secure attachment, while a hanging ornament may use a different loop.',
    checkBeforeBuying: [
      'Check the PDF details for the tier assembly and star placement.',
      'Decide whether you want to add bead ornaments; they are optional decoration and need suitable attachment.',
      'This is a miniature decoration or keychain, not a toy for young children.',
    ],
    questions: [
      { question: 'Can I leave off the beads?', answer: 'The listed design describes the colourful beads as optional. Review the PDF finishing instructions for the version you prefer.' },
      { question: 'Does the purchase include the keyring or finished tree?', answer: 'No. You are buying digital instructions. Yarn, keyring hardware and the finished ornament are not shipped.' },
    ],
  },
  'crochet-rose-bag-pattern-3d-floral-clutch-with-gold-o-ring-handles-pdf': {
    introduction: 'This design combines a sculptural flower with a usable bag shape. The layered red petals create the rose effect, while the gold O-ring handles and the optional chain change how the finished clutch is carried. Treat the flower silhouette, bag opening and lining as three separate planning decisions before you choose materials: all three affect the final appearance.',
    checkBeforeBuying: [
      'Look at the petal layers and the bag opening in the listing photographs.',
      'Check the materials list for ring handles, any optional chain and lining fabric.',
      'This is the PDF pattern for making a clutch, not a pre-made floral handbag.',
    ],
    questions: [
      { question: 'Are gold handles or a chain shipped with the PDF?', answer: 'No hardware is supplied. The listing describes gold O-ring handles and a detachable chain as design elements; obtain the materials separately.' },
      { question: 'Can I use different yarn?', answer: 'Changing yarn weight or tension changes the structure of a sculptural bag. Compare your yarn and gauge with the pattern materials before starting.' },
    ],
  },
  'crochet-bow-bag-pattern-pdf-chunky-yarn-shoulder-purse-coquette-ribbon-bag-diy': {
    introduction: 'The oversized bow in this shoulder bag is part of the construction, not merely an appliqué stitched to the front. The listing describes a rectangle folded and cinched into a plush bow, with a functioning pouch opening and strap attachment. If you are choosing between this and a flat bow accessory, pay particular attention to the body structure and the hardware shown in the materials list.',
    checkBeforeBuying: [
      'Compare the suggested chunky tube or tape yarn with what you already have.',
      'Check how the bag opening stays accessible after the bow is formed.',
      'Plan for the strap and O-ring hardware separately; they are not in the digital download.',
    ],
    questions: [
      { question: 'Is the bag a decorative bow or a usable pouch?', answer: 'The source listing describes a functional pouch behind the sculptural bow. Review the finished-size and construction details before starting.' },
      { question: 'Will ordinary thin yarn create the same volume?', answer: 'A thinner yarn is likely to change the scale and firmness. The listing specifies a chunky yarn construction, so follow the yarn and gauge guidance before substituting.' },
    ],
  },
  'crochet-baby-clog-pattern-structured-sage-green-shoes-tutorial-pdf-download': {
    introduction: 'These sage-green crochet baby clogs are intended to keep a rounded shoe-like outline rather than the drape of a soft sock. The design includes a shaped toe section, a structured sole and a strap with button detail. For infant footwear, the most useful number is the actual foot or sole measurement, not the month label alone. Check the sizing and attachment steps carefully before making a pair.',
    checkBeforeBuying: [
      'Compare the size chart against the intended wearer’s foot length, allowing for comfortable fit.',
      'Review how the shaped toe is joined to the sole and how the strap is attached.',
      'Buttons and other small parts on baby footwear need particular care and inspection.',
    ],
    questions: [
      { question: 'Can I choose the size using age alone?', answer: 'Age bands are approximate. Measure the foot and compare it with the pattern dimensions and gauge before choosing a size.' },
      { question: 'What if a joining step is unclear?', answer: 'Contact Dyasse with the page, row or round and a photo of your work if helpful; this allows the exact instruction to be reviewed.' },
    ],
  },
  'crescent-moon-crochet-pattern-pdf-kawaii-moon-plush-amigurumi': {
    introduction: 'The curve is what makes this crescent-moon plush distinctive. The chenille-style surface, soft cheeks and embroidered expression frame that shape rather than hiding it. When planning your version, consider yarn texture, even stuffing and the position of the face details: changes to those choices can make the same instructions look noticeably different.',
    checkBeforeBuying: [
      'Check the listed yarn weight and stuffing requirements before starting the curved body.',
      'Read the face placement instructions before adding cheeks or eyes.',
      'For an item intended for a child, review all small-part and safety notes carefully.',
    ],
    questions: [
      { question: 'Is the completed moon included?', answer: 'No. The purchase is the digital crochet pattern, not a stuffed moon or the materials for one.' },
      { question: 'Does substituting yarn change the result?', answer: 'Yes. A different yarn thickness or texture can change the size, surface appearance and firmness; refer to the project’s materials and gauge guidance.' },
    ],
  },
  'strawberry-airpods-pro-case-crochet-pattern-pdf-kawaii-earbud-keychain-cover': {
    introduction: 'This strawberry design turns an earbud charging case into a small accessory: a red fitted body, separate lid, embroidered seed marks and green leaf detail. The cover is model-specific, so fit matters more than colour choice. Check which AirPods Pro model you own and the pattern’s dimensions before assuming the cover will suit a different charging case.',
    checkBeforeBuying: [
      'Confirm the charging-case model and shape before choosing the pattern.',
      'Allow for a snug crocheted fit without blocking the case opening or charging access.',
      'The pattern download does not include electronics, earbuds, keyring hardware or yarn.',
    ],
    questions: [
      { question: 'Is this a physical AirPods case?', answer: 'No. The download provides crochet instructions for making a case cover; no charging case or earbuds are included.' },
      { question: 'Will the sizing suit every earbud case?', answer: 'No universal fit should be assumed. The listing is for an AirPods Pro-inspired design; check the stated measurements and construction before buying.' },
    ],
  },
  'crochet-vintage-car-keychain-pattern-pdf-retro-amigurumi-auto-bag-charm': {
    introduction: 'The vintage look of this little car is built from distinct parts: a shaped blue body, contrasting roof and windows, padded wheels and small grille details. The miniature format makes symmetry noticeable, especially at the wheel placement and front trim. Consider whether you want it as a bag charm or keyring before attaching the final hardware.',
    checkBeforeBuying: [
      'Review the stitch and assembly instructions for the front grille and wheels.',
      'Check the measurements if you need a particular bag-charm or keyring size.',
      'Finished models, stuffing, keyring hardware and other supplies are not included.',
    ],
    questions: [
      { question: 'Does the pattern make a flat appliqué or a shaped car?', answer: 'The listing describes a three-dimensional amigurumi-style miniature with separately assembled details.' },
      { question: 'What should I check while assembling it?', answer: 'Compare the positions of both wheels and the front grille with the pattern instructions before securing each piece.' },
    ],
  },
  'ribbed-knit-hat-pattern-pdf-beginner-adult-folded-brim-beanie': {
    introduction: 'This adult beanie relies on a simple combination of stretch and structure. The ribbing gives the hat its texture, while the folded brim adds a thicker edge. Before substituting yarn, compare the suggested worsted weight, the pattern gauge and the intended finished circumference. A few stitches of gauge difference can matter more than the appearance of the yarn ball.',
    checkBeforeBuying: [
      'Check that the knitting method and techniques suit your experience.',
      'Measure gauge in the ribbed fabric rather than assuming a general yarn label is enough.',
      'Read the instructions for the folded brim and final crown finishing.',
    ],
    questions: [
      { question: 'Is the finished beanie included?', answer: 'No. This is a downloadable knitting PDF pattern; the hat, needles and yarn are purchased separately.' },
      { question: 'What happens if I change needle or yarn size?', answer: 'The hat’s circumference and stretch may change. Swatch and compare the gauge with the pattern before committing to a size.' },
    ],
  },
}

export function productStudioNote(slug: string): StudioNote | null {
  return Object.prototype.hasOwnProperty.call(notes, slug) ? notes[slug] : null
}
