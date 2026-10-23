import { NextRequest, NextResponse } from "next/server"
import { getCurrentAdminState } from "@/lib/admin-products"
import { extractListingFromHtml, validateEtsyUrl } from "@/lib/etsy"

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"

export async function POST(request: NextRequest) {
  const admin = await getCurrentAdminState()
  if (!admin.isAdmin) return NextResponse.json({ success:false, error:"Admin access required." }, { status:403 })
  const origin = request.headers.get("origin")
  if (origin && new URL(origin).host !== request.nextUrl.host) return NextResponse.json({ success:false, error:"Invalid origin." }, { status:403 })
  try {
    const body = await request.json()
    const etsyUrl = String(body?.etsyUrl ?? "").trim()

    if (!etsyUrl || !validateEtsyUrl(etsyUrl)) {
      return NextResponse.json({ success: false, error: "Invalid Etsy listing URL." }, { status: 400 })
    }

    const gumroadToken = process.env.GUMROAD_ACCESS_TOKEN
    if (!gumroadToken) {
      return NextResponse.json({ success: false, error: "Server missing GUMROAD_ACCESS_TOKEN." }, { status: 500 })
    }

    const etsyResponse = await fetch(etsyUrl, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html",
      },
      cache: "no-store",
    })

    if (!etsyResponse.ok) {
      return NextResponse.json({ success: false, error: `Failed to fetch Etsy page (${etsyResponse.status}).` }, { status: 502 })
    }

    const html = await etsyResponse.text()
    const listing = extractListingFromHtml(html)

    const payload = new URLSearchParams({
      access_token: gumroadToken,
      name: listing.name,
      description: `${listing.description}\n\nImported from Etsy listing: ${etsyUrl}`,
      price: listing.price,
      currency: listing.currency,
      "custom_permalink": `etsy-import-${Date.now()}`,
      "preview_url": listing.imageUrl,
    })

    const gumroadResponse = await fetch("https://api.gumroad.com/v2/products", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload.toString(),
    })

    const gumroadJson = await gumroadResponse.json()
    if (!gumroadResponse.ok || gumroadJson?.success === false) {
      return NextResponse.json(
        {
          success: false,
          error: gumroadJson?.message ?? "Gumroad product creation failed.",
        },
        { status: 502 }
      )
    }

    const productId = gumroadJson?.product?.id
    const productUrl = gumroadJson?.product?.short_url ?? (productId ? `https://gumroad.com/l/${productId}` : null)

    return NextResponse.json({
      success: true,
      productName: listing.name,
      productUrl,
      message: "Migration completed successfully.",
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected migration error."
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
