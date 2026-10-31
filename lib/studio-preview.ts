import 'server-only'

import { createServiceClient } from '@/lib/supabase/service'

export type StudioPreviewProduct = {
  id: string
  title: string
  image_url: string
  category: string | null
  source_image_count: number
}

export async function getStudioPreviewProducts(limit = 36): Promise<StudioPreviewProduct[]> {
  try {
    const db = createServiceClient()
    const { data: assets, error: assetError } = await db.from('product_asset_intake')
      .select('product_id,separate_image_count')
      .eq('match_status', 'candidate_match')
      .eq('qa_status', 'pending_final_review')
      .not('product_id', 'is', null)
    if (assetError || !assets?.length) return []
    const byId = new Map<string, number>()
    for (const asset of assets) if (asset.product_id) byId.set(asset.product_id, asset.separate_image_count ?? 0)
    const { data, error } = await db.from('products')
      .select('id,title,image_url,category,slug,is_published,qa_verified')
      .in('id', [...byId.keys()])
      .eq('is_published', false)
      .eq('qa_verified', false)
    if (error || !data) return []

    // Display only existing catalog photographs, never raw PDF scans,
    // unverified ZIP attachments or private digital-download URLs.
    return data
      .filter(item => typeof item.image_url === 'string' &&
        (/^https:\/\/(i\.etsystatic\.com|[^/]+\.supabase\.co)\//.test(item.image_url) ||
          /^https:\/\/dyasse\.com\/images\/catalog\/[A-Za-z0-9_]+__\d{2}\.webp$/.test(item.image_url)))
      .map(item => ({
        id: item.id as string,
        title: item.title as string,
        image_url: item.image_url as string,
        category: item.category as string | null,
        source_image_count: byId.get(item.id as string) ?? 0,
      }))
      .sort((a, b) => b.source_image_count - a.source_image_count || a.title.localeCompare(b.title))
      .slice(0, Math.max(0, Math.min(limit, 36)))
  } catch {
    return []
  }
}
