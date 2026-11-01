# Dyasse Shop — Seller QA attestation and private PDF matching for 37 patterns

**Date:** 2026-11-01
**Scope:** Only the 37 previously unpublished digital PDF patterns listed here. The 19 already published products are excluded.

## QA authority and scope

- On 2026-11-01 the seller explicitly confirmed the 37 product patterns have already passed their QA and instructed publication on dyasse.com without waiting for Gumroad.
- This is a **seller QA attestation**, not a claim of independent physical sample knitting/crochet validation or completed purchase tests.
- Read-only Supabase checks confirmed 37 distinct product IDs and slugs, existing private `dyasse-paid-patterns/DYS-XXXX/Pattern.pdf` objects, MIME type `application/pdf`, stored byte count equal to expected byte count, positive USD prices equal to configured PayPal cents, a main image, and non-empty SEO title/description.
- Publication uses **dyasse.com PayPal checkout with private Supabase PDF delivery**. Gumroad publication, Gumroad file attachment and Gumroad buyer checkout **are not asserted**; existing Gumroad flags remain unchanged.
- The PayPal server endpoint rechecks product publication, QA flag, PDF path and file existence before creating an order. Real payment capture and successful buyer delivery were not independently exercised as part of this attestation.
- Earlier matching/version warnings and private source notes are retained in the product asset intake table. The seller approved the patterns, but this report does not independently clear those earlier technical warnings.

## Seller-approved products

| SKU | Product title | USD | Private file path | Stored bytes | QA basis |
|---|---|---:|---|---:|---|
| DYS-0002 | Crochet Raffia Clutch Pattern PDF: Dumpling Flex Frame Purse Tutorial, Summer Bag | $7.12 | `DYS-0002/Pattern.pdf` | 101765 | seller-approved; earlier multiple-version candidate note retained |
| DYS-0004 | Crochet Baby Sandals Pattern PDF: Criss Cross Double Sole Tutorial | $5.09 | `DYS-0004/Pattern.pdf` | 87858 | seller-approved |
| DYS-0006 | Crochet Baby Clog Pattern, Structured Sage Green Shoes Tutorial (PDF Download) | $5.09 | `DYS-0006/Pattern.pdf` | 147368 | seller-approved; earlier multiple-version candidate note retained |
| DYS-0010 | No Curl Knit Headband Pattern: Flat Ear Warmer PDF for Beginners | $2.54 | `DYS-0010/Pattern.pdf` | 725327 | seller-approved |
| DYS-0012 | Crochet Baby Booties Pattern PDF: Scalloped Newborn Shoes with Ribbon | $5.09 | `DYS-0012/Pattern.pdf` | 5742108 | seller-approved; earlier multiple-version candidate note retained |
| DYS-0026 | Alpine Blanket Crochet Pattern PDF: Seamless Luxury Throw, 8 Sizes Baby to King, Ribbed Border | $5.09 | `DYS-0026/Pattern.pdf` | 69909 | seller-approved |
| DYS-0027 | Crochet Scooter Keychain Pattern PDF, Retro Moped Bag Charm, 2D Amigurumi Gift | $5.09 | `DYS-0027/Pattern.pdf` | 183651 | seller-approved; earlier multiple-version candidate note retained |
| DYS-0030 | Crochet Vintage Car Keychain Pattern PDF - Retro Amigurumi Auto Bag Charm | $5.09 | `DYS-0030/Pattern.pdf` | 9226407 | seller-approved |
| DYS-0032 | Structured Crochet Tote Bag Pattern PDF: Chevron Bobble Bag with Wooden Ring Handles | $5.09 | `DYS-0032/Pattern.pdf` | 2399839 | seller-approved; earlier multiple-version candidate note retained |
| DYS-0040 | Advanced Cable Knit Hat Pattern: Lace Charts, Folded Brim Beanie (PDF Download) | $5.09 | `DYS-0040/Pattern.pdf` | 831751 | seller-approved; earlier multiple-version candidate note retained |
| DYS-0041 | Crochet Lion Keychain Pattern PDF, Safari Amigurumi Bag Charm, Jungle Baby Shower Gift | $5.09 | `DYS-0041/Pattern.pdf` | 341380 | seller-approved |
| DYS-0047 | God Crochet Keychain Pattern PDF \| Christian Faith Gift \| Digital Download | $5.09 | `DYS-0047/Pattern.pdf` | 638218 | seller-approved |
| DYS-0056 | Twisted Knit Headband Pattern PDF: Easy No-Curl Ear Warmer, Beginner Flat Edge Tutorial | $5.09 | `DYS-0056/Pattern.pdf` | 8900 | seller-approved |
| DYS-0065 | Crescent Moon Crochet Pattern PDF, Kawaii Moon Plush Amigurumi | $5.09 | `DYS-0065/Pattern.pdf` | 1675931 | seller-approved |
| DYS-0067 | Amigurumi Mouse Keychain Crochet Pattern PDF | $5.09 | `DYS-0067/Pattern.pdf` | 15812897 | seller-approved |
| DYS-0070 | Crochet Bee Keychain Pattern PDF, Backpacker Amigurumi with Bucket Hat and Backpack | $5.09 | `DYS-0070/Pattern.pdf` | 723937 | seller-approved; earlier multiple-version candidate note retained |
| DYS-0072 | Crochet Baby Mary Jane Shoes Pattern PDF: Flower Baby Booties Tutorial | $5.09 | `DYS-0072/Pattern.pdf` | 84964 | seller-approved; earlier multiple-version candidate note retained |
| DYS-0088 | Crochet Bow Bag Pattern PDF, Chunky Yarn Shoulder Purse, Coquette Ribbon Bag DIY | $5.09 | `DYS-0088/Pattern.pdf` | 652734 | seller-approved |
| DYS-0106 | Ribbed Knit Hat Pattern PDF: Beginner Adult Folded Brim Beanie | $3.05 | `DYS-0106/Pattern.pdf` | 1995463 | seller-approved |
| DYS-0110 | Avocado Crossbody Bag Crochet Pattern PDF, Fruit Purse Digital Download | $5.09 | `DYS-0110/Pattern.pdf` | 18493165 | seller-approved |
| DYS-0114 | Penguin Coin Purse Crochet Pattern PDF, Navy Kiss-Clasp Pouch | $5.09 | `DYS-0114/Pattern.pdf` | 4527296 | seller-approved |
| DYS-0116 | Crochet Owl Pattern PDF: Chubby Woodland Amigurumi with Tapestry Crochet Belly | $5.09 | `DYS-0116/Pattern.pdf` | 1261380 | seller-approved |
| DYS-0117 | Crochet Puppy Wall Organizer Pattern PDF, Dog Nursery Storage, Hanging Pocket Decor | $8.14 | `DYS-0117/Pattern.pdf` | 4380121 | seller-approved; earlier multiple-version candidate note retained |
| DYS-0125 | Crochet Glasses Case Pattern PDF, Cat Eyeglass Pouch with Wrist Strap | $5.09 | `DYS-0125/Pattern.pdf` | 17941726 | seller-approved; earlier multiple-version candidate note retained |
| DYS-0129 | Crochet Bucket Hat Pattern PDF: Burgundy Bow Sun Hat with Mesh Brim for Women | $5.09 | `DYS-0129/Pattern.pdf` | 4581158 | seller-approved |
| DYS-0137 | Crochet Heart Keychain Pattern PDF: Coquette Lace Amigurumi Bag Charm | $5.09 | `DYS-0137/Pattern.pdf` | 4847231 | seller-approved |
| DYS-0139 | Strawberry AirPods Pro Case Crochet Pattern PDF, Kawaii Earbud Keychain Cover | $5.09 | `DYS-0139/Pattern.pdf` | 4257979 | seller-approved; earlier multiple-version candidate note retained |
| DYS-0141 | Mint Crochet Bucket Hat Pattern PDF, Lace Sun Hat with Scalloped Brim & Flower | $5.09 | `DYS-0141/Pattern.pdf` | 2830498 | seller-approved |
| DYS-0143 | Purple Crochet Sun Visor Pattern PDF, Adjustable Double Brim with Flower, US Terms | $5.09 | `DYS-0143/Pattern.pdf` | 9044531 | seller-approved |
| DYS-0146 | Bumblebee Keychain Crochet Pattern PDF | $5.09 | `DYS-0146/Pattern.pdf` | 4179386 | seller-approved; earlier multiple-version candidate note retained |
| DYS-0148 | Crochet Dolphin Pattern PDF, Rainbow Amigurumi Sea Animal, Ocean Nursery Crochet | $5.09 | `DYS-0148/Pattern.pdf` | 4727510 | seller-approved |
| DYS-0149 | Crochet Cow Baby Booties Pattern PDF, Newborn Farm Animal Shoes, 0-3 Month Tutorial | $5.09 | `DYS-0149/Pattern.pdf` | 8877898 | seller-approved |
| DYS-0151 | Crochet Turtle Mug Rug Pattern PDF, Animal Coaster with 3D Amigurumi Head | $5.09 | `DYS-0151/Pattern.pdf` | 2920815 | seller-approved |
| DYS-0152 | Crochet Lion Keychain Pattern PDF, 8-Petal Flower Amigurumi Bag Charm | $5.09 | `DYS-0152/Pattern.pdf` | 4633926 | seller-approved |
| DYS-0156 | Blue Whale Crochet Keychain Pattern PDF: Amigurumi Bag Charm | $5.09 | `DYS-0156/Pattern.pdf` | 316281 | seller-approved |
| DYS-0157 | Crochet Baby Sandals Pattern PDF: Red Gold T-Strap Shoes, Double Sole and Headband Set | $5.09 | `DYS-0157/Pattern.pdf` | 1238846 | seller-approved |
| DYS-0158 | Crochet Bunny Coaster Pattern PDF: 3D Sleeping Bunny Mug Rug, Easter Decor | $5.09 | `DYS-0158/Pattern.pdf` | 1382084 | seller-approved |

## Release boundary

The seller is responsible for pattern accuracy. This report supports release of direct-paypal site listings whose files are securely stored; it is not proof that Gumroad is published or that an end-to-end live paid transaction succeeded. No paid PDF content, secret key, or signed download link is included.
