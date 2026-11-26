#!/usr/bin/env node
/**
 * One-time Dyasse product-media migration.
 * Dry-run by default. Existing product identifiers and publishing status
 * are never changed. Supabase Storage is the permanent media host.
 *
 * Usage:
 *   node scripts/migrate-owned-images.mjs
 *   node scripts/migrate-owned-images.mjs --manifest=./media-manifest.json --apply
 *   node scripts/migrate-owned-images.mjs --legacy-source --apply
 *
 * A manifest maps an old image URL to an absolute/local image file path.
 * --legacy-source downloads each CURRENT source image ONCE as a fallback
 * when no local Drive-sourced file has been matched. All final URLs point
 * to the project's own public Supabase bucket.
 */
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'

const args = process.argv.slice(2)
const has = flag => args.includes(flag)
const value = key => args.find(x => x.startsWith(key + '='))?.slice(key.length + 1)
const apply = has('--apply')
const allowLegacy = has('--legacy-source')
const manifestPath = value('--manifest')
const limit = value('--limit') ? Number(value('--limit')) : Infinity
if (!Number.isFinite(limit) && limit !== Infinity || limit < 1) throw Error('Invalid --limit')
if (apply && !manifestPath && !allowLegacy) throw Error('Applying requires a Drive manifest or --legacy-source')
const URL_ROOT = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/$/, '')
const SECRET = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!URL_ROOT || !SECRET) throw Error('Missing SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY')
if (!URL_ROOT.startsWith('https://ouvdzdhpinteofjyccfe.supabase.co')) {
  throw Error('Project guard: refusing to touch a different Supabase project')
}
const bucket = 'dyasse-product-images'
const publicPrefix = URL_ROOT + '/storage/v1/object/public/' + bucket + '/'
const db = createClient(URL_ROOT, SECRET, { auth: { persistSession: false, autoRefreshToken: false } })
const manifest = manifestPath ? JSON.parse(await readFile(manifestPath, 'utf8')) : {}
if (typeof manifest !== 'object' || !manifest || Array.isArray(manifest)) throw Error('Manifest must be an object')
const outdir = path.resolve('migration-reports')
await mkdir(outdir, { recursive: true })
const stamp = new Date().toISOString().replace(/[:.]/g, '-')

function fromEtsy(url) {
  try {
    const u = new URL(url)
    return u.protocol === 'https:' && u.hostname === 'i.etsystatic.com'
  } catch { return false }
}
function extension(data) {
  if (data.length > 4 && data[0] === 255 && data[1] === 216 && data[2] === 255) return ['jpg', 'image/jpeg']
  if (data.length > 8 && data[0] === 137 && data[1] === 80 && data[2] === 78 && data[3] === 71) return ['png', 'image/png']
  if (data.length > 12 && data.toString('ascii', 0, 4) === 'RIFF' && data.toString('ascii', 8, 12) === 'WEBP') return ['webp', 'image/webp']
  throw Error('Invalid or unsupported image file (expected JPEG, PNG or WebP)')
}
async function sourceBytes(url, slug) {
  const local = manifest[url] || manifest[slug + '::' + url]
  if (local) return { bytes: await readFile(path.resolve(String(local))), source: 'local-drive-file' }
  if (!allowLegacy) throw Error('No verified Drive asset mapping for this URL')
  if (!fromEtsy(url)) throw Error('Legacy source URL is not the expected Etsy image CDN')
  const r = await fetch(url, { signal: AbortSignal.timeout(25000), redirect: 'follow' })
  if (!r.ok) throw Error('Legacy one-time download HTTP ' + r.status)
  if (new URL(r.url).hostname !== 'i.etsystatic.com') throw Error('Unexpected redirect host')
  const size = Number(r.headers.get('content-length') || 0)
  if (size > 9_000_000) throw Error('Image too large')
  return { bytes: Buffer.from(await r.arrayBuffer()), source: 'one-time-download' }
}
async function uploadAndVerify(url, slug, summary) {
  if (!fromEtsy(url)) return url
  const {bytes, source} = await sourceBytes(url, slug)
  if (bytes.length < 100 || bytes.length > 9_000_000) throw Error('Invalid image byte size')
  const [ext, mime] = extension(bytes)
  const urlHash = createHash('sha256').update(url).digest('hex').slice(0,24)
  const safeSlug = String(slug).replace(/[^a-z0-9-]/g, '').slice(0,140)
  if (safeSlug !== slug || !safeSlug) throw Error('Unsafe product slug')
  const objectPath = 'product-catalog/' + safeSlug + '/' + urlHash + '.' + ext
  const {error} = await db.storage.from(bucket).upload(objectPath, bytes, {
    contentType: mime, cacheControl: '31536000', upsert: false,
  })
  if (error && !(/already exists|duplicate/i.test(error.message || '') || String(error.statusCode) === '409')) {
    throw Error('Storage upload rejected: ' + error.message)
  }
  // Download and hash the stored asset before changing any product URL.
  const {data:stored, error:readError} = await db.storage.from(bucket).download(objectPath)
  if (readError || !stored) throw Error('Unable to read back uploaded image')
  const readBytes = Buffer.from(await stored.arrayBuffer())
  if (createHash('sha256').update(readBytes).digest('hex') !== createHash('sha256').update(bytes).digest('hex')) {
    throw Error('Stored image hash mismatch')
  }
  summary.files.push({path:objectPath, source, bytes:bytes.length})
  return publicPrefix + objectPath
}
const {data:products, error:loadError} = await db.from('products')
  .select('id,slug,title,image_url,gallery_images,is_published,qa_verified')
  .order('slug', {ascending:true}).limit(1000)
if (loadError || !products) throw Error('Cannot read product catalog: ' + (loadError?.message || 'empty'))
const candidates = products.filter(p => {
  const gallery = Array.isArray(p.gallery_images) ? p.gallery_images : []
  return [p.image_url, ...gallery].some(x => typeof x === 'string' && fromEtsy(x))
})
const preview = {
  at: new Date().toISOString(), mode: apply ? 'apply' : 'dry-run',
  totalProducts: products.length, candidates: candidates.length,
  etsyHero: candidates.filter(p => fromEtsy(p.image_url)).length,
  etsyGallery: candidates.reduce((n,p) => n + (Array.isArray(p.gallery_images) ? p.gallery_images.filter(fromEtsy).length : 0), 0),
}
const backupPath = path.join(outdir, 'before-' + stamp + '.json')
await writeFile(backupPath, JSON.stringify({summary:preview, products:candidates}, null, 2))
console.log(JSON.stringify({summary:preview, backupPath}))
if (!apply) process.exit(0)

const report = {summary:preview, completed:[], failed:[], skipped:[]}
for (const p of candidates.slice(0, limit)) {
  const galleries = Array.isArray(p.gallery_images) ? p.gallery_images : []
  const urls = [...new Set([p.image_url, ...galleries].filter(fromEtsy))]
  const step = {slug:p.slug, files:[]}
  try {
    const replacement = new Map()
    for (const url of urls) replacement.set(url, await uploadAndVerify(url, p.slug, step))
    const nextHero = replacement.get(p.image_url) || p.image_url
    const nextGallery = galleries.map(x => replacement.get(x) || x)
    if ([nextHero, ...nextGallery].some(fromEtsy)) throw Error('Some external media URLs remain')
    const current = await db.from('products').select('image_url,gallery_images').eq('id',p.id).single()
    if (current.error || current.data.image_url !== p.image_url ||
        JSON.stringify(current.data.gallery_images || []) !== JSON.stringify(galleries)) {
      throw Error('Product media changed during migration; refusing to overwrite')
    }
    const updated = await db.from('products')
      .update({image_url:nextHero, gallery_images:nextGallery})
      .eq('id',p.id).eq('image_url',p.image_url)
      .select('id,image_url,gallery_images')
    if (updated.error || updated.data?.length !== 1) throw Error('Product update failed or conflicted')
    if (updated.data[0].image_url !== nextHero ||
        JSON.stringify(updated.data[0].gallery_images || []) !== JSON.stringify(nextGallery)) {
      throw Error('Product URL read-back mismatch')
    }
    report.completed.push(step)
    console.log('MIGRATED', p.slug, step.files.length)
  } catch(e) {
    report.failed.push({slug:p.slug,reason:String(e)})
    console.error('HOLD', p.slug, String(e))
  }
}
const reportPath = path.join(outdir, 'result-' + stamp + '.json')
await writeFile(reportPath, JSON.stringify(report, null, 2))
console.log(JSON.stringify({complete:report.completed.length,failed:report.failed.length,reportPath}))
if (report.failed.length) process.exitCode = 2
