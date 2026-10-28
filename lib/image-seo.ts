import type { Product } from '@/types/product'

// Cover descriptions are grounded in the published catalog's actual product designs.
// Other gallery slides intentionally avoid claiming a camera angle or feature that
// hasn't been verified for that particular asset.
const coverAltBySlug: Record<string, string> = {
  'cocoa-bobble-handbag-crochet-pattern-pdf-chunky-tube-yarn-purse-with-d-shaped-handles':
    'Cocoa brown crochet handbag with raised bobble texture and rigid D-shaped handles',
  'color-block-crochet-wristlet-keychain-pattern-strap-pdf':
    'Color block crochet wristlet keychain in turquoise, coral and mustard yarn',
  'crochet-bicycle-keychain-pattern-mini-flower-bike-pdf':
    'Miniature crochet bicycle keychain with spoked wheels and a flower-filled front basket',
  'crochet-eiffel-tower-keychain-pattern-pdf-3d-paris-souvenir-miniature-crochet-tutorial-digital-downl':
    'Three dimensional crochet Eiffel Tower souvenir keychain with lattice detailing',
  'crochet-leaf-hair-net-pattern-pdf-open-mesh-snood-cap-with-leaf-garland':
    'Open mesh crochet snood hair net with leaf garland, hanging vines and flower',
  'crochet-pencil-case-pattern-pdf-pastel-cherry-zipper-pouch-tutorial-beginner-friendly':
    'Pastel crochet pencil case with cherry decorations and a zipper closure',
  'crochet-soccer-ball-keychain-pattern-football-charm-pdf':
    'Black and white crochet soccer ball keychain assembled from pentagon and hexagon motifs',
  'crochet-swing-doll-ornament-pdf-pattern-amigurumi-hanging-car-charm':
    'Crochet swing doll ornament with a sky blue bow and hanging swing',
  'gray-crochet-cat-bun-cover-pdf-pattern-kitty-hair-accessory':
    'Gray cat shaped crochet bun cover with pointed ears and textured stitches',
  'gray-raised-diagonal-crochet-handbag-pattern-pdf-flower-shoulder-bag':
    'Gray crochet handbag with raised diagonal texture and flower accent',
  'mini-crochet-backpack-keychain-pattern-tiny-bag-charm-pdf':
    'Olive green miniature crochet backpack keychain with tan front pocket',
  'mini-crochet-baseball-cap-keychain-pattern-tiny-hat-charm-pdf':
    'Navy miniature crochet baseball cap keychain with cream visor',
  'mini-crochet-beanie-keychain-pattern-tiny-pom-pom-hat-pdf':
    'Miniature powder blue crochet beanie keychain with ribbed cuff and pom pom',
  'mini-crochet-paint-bucket-keychain-pattern-artist-charm-pdf':
    'Mini crochet paint bucket keychain with colorful paint drips and tiny paintbrush',
  'sunshine-daisy-crochet-backpack-pattern-pdf-floral-drawstring-bag-tutorial-digital-download':
    'Yellow daisy crochet backpack with floral appliques and drawstring closure',
  'terracotta-crochet-sun-hat-pdf-pattern-lace-brim-summer-hat':
    'Terracotta crochet sun hat with lace bands, scalloped brim and flower',
  'watermelon-baby-mary-jane-crochet-pattern-03-month-prewalker-shoes-pdf':
    'Watermelon themed crochet baby Mary Jane shoes with green soles and button straps',
  'yellow-kitty-keychain-crochet-pattern-pdf-big-eye-cat-amigurumi':
    'Yellow amigurumi cat crochet keychain with oversized eyes and curled tail',
}

export function productCoverAlt(product: Product): string {
  return coverAltBySlug[product.slug] ?? product.title.replace(/\s*(PDF|Digital Download|Tutorial)\b/gi, '').trim()
}

export function productGalleryAlt(product: Product, galleryIndex: number): string {
  const shortName = product.title.split(/\s*(?:Pattern|PDF|Tutorial|\|)/i)[0].trim()
  return `${shortName} crochet pattern — additional design image ${galleryIndex} of ${product.gallery_images.length}`
}
