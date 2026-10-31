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
'purple-crochet-sun-visor-pattern-pdf-adjustable-double-brim-with-flower-us-terms':
    'Deep plum crochet sun visor with structured brim and flower detail',
  'amigurumi-mouse-keychain-crochet-pattern-pdf':
    'Grey crocheted amigurumi mouse keychain with pink ears and metal keyring',
  'avocado-crossbody-bag-crochet-pattern-pdf-fruit-purse-digital-download':
    'Green avocado-shaped crochet crossbody purse with a round brown centre and strap',
  'crochet-bucket-hat-pattern-pdf-burgundy-bow-sun-hat-with-mesh-brim-for-women':
    'Burgundy crochet bucket hat with open mesh brim and a large matching bow',
  'crochet-heart-keychain-pattern-pdf-coquette-lace-amigurumi-bag-charm':
    'Blue crochet heart keychain with cream lace trim and ribbon bow',
  'crochet-cow-baby-booties-pattern-pdf-newborn-farm-animal-shoes-0-3-month-tutorial':
    'White crochet baby bootie decorated with pink cow ears and muzzle',
  'crochet-glasses-case-pattern-pdf-cat-eyeglass-pouch-with-wrist-strap':
    'Cat-shaped crochet glasses pouch with green eyes and beige pointed ears',
  'crescent-moon-crochet-pattern-pdf-kawaii-moon-plush-amigurumi':
    'Soft yellow crochet crescent moon plush with embroidered eyes and pink cheeks',
  'crochet-lion-keychain-pattern-pdf-8-petal-flower-amigurumi-bag-charm':
    'Amigurumi lion face keychain surrounded by blue crochet flower petals',
  'mint-crochet-bucket-hat-pattern-pdf-lace-sun-hat-with-scalloped-brim-flower':
    'Mint green crochet sun hat with scalloped brim and cream flower embellishment',
  'penguin-coin-purse-crochet-pattern-pdf-navy-kiss-clasp-pouch':
    'Navy crochet penguin coin purse with a white face and silver kiss clasp',
  'crochet-dolphin-pattern-pdf-rainbow-amigurumi-sea-animal-ocean-nursery-crochet':
    'Pastel rainbow crochet dolphin amigurumi plush with green fins',
  'crochet-baby-sandals-pattern-pdf-red-gold-t-strap-shoes-double-sole-and-headband-set':
    'Red crochet baby sandals with gold trim and flower embellishments beside matching headband',
  'strawberry-airpods-pro-case-crochet-pattern-pdf-kawaii-earbud-keychain-cover':
    'Red strawberry crochet AirPods case with green leaf top and white earbuds',
  'bumblebee-keychain-crochet-pattern-pdf':
    'Yellow and black striped amigurumi bumblebee crochet keychain with metal split ring',
  'crochet-bunny-coaster-pattern-pdf-3d-sleeping-bunny-mug-rug-easter-decor':
    'Cream crochet sleeping bunny on a yellow scalloped coaster',
  'crochet-turtle-mug-rug-pattern-pdf-animal-coaster-with-3d-amigurumi-head':
    'Turquoise turtle crochet mug rug with three-dimensional turtle head beside a cup',
  'crochet-vintage-car-keychain-pattern-pdf-retro-amigurumi-auto-bag-charm':
    'Blue miniature vintage car crochet keychain with silver front grille',
  'crochet-owl-pattern-pdf-chubby-woodland-amigurumi-with-tapestry-crochet-belly':
    'Blue and cream crochet woodland owl amigurumi with large round eyes'
}

export function productCoverAlt(product: Product): string {
  return coverAltBySlug[product.slug] ?? product.title.replace(/\s*(PDF|Digital Download|Tutorial)\b/gi, '').trim()
}

export function productGalleryAlt(product: Product, galleryIndex: number): string {
  const subject = productCoverAlt(product)
  // Describe only the item pictured; alternate gallery views may be lifestyle,
  // detail or assembly photos, so do not invent specific angles or attributes.
  return `${subject} — additional product photo ${galleryIndex + 1}`
}
