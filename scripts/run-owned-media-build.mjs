#!/usr/bin/env node
/**
 * A one-off production maintenance gate, invoked before Next.js compilation.
 * Never starts in previews or local development, and never exposes a HTTP API.
 * Remove the activation once the migration has been verified.
 */
import { readFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'

if (process.env.VERCEL_ENV !== 'production') {
  console.log('[dyasse-media] not production, migration skipped')
  process.exit(0)
}
if (process.env.VERCEL_GIT_COMMIT_REF && process.env.VERCEL_GIT_COMMIT_REF !== 'main') {
  console.log('[dyasse-media] branch is not main, migration skipped')
  process.exit(0)
}
if (process.env.VERCEL_PROJECT_ID && process.env.VERCEL_PROJECT_ID !== 'prj_Dnh1DZp8b4TpxRfz7jpCOoxQ7SUL') {
  throw new Error('[dyasse-media] refusing to run on another Vercel project')
}

const config = JSON.parse(await readFile(new URL('./media-migration-activation.json', import.meta.url), 'utf8'))
if (config?.enabled !== true || config.mode === 'disabled') {
  console.log('[dyasse-media] migration disabled')
  process.exit(0)
}
if (!['pilot', 'full'].includes(config.mode)) throw new Error('Invalid media migration mode')
if (config.mode === 'pilot' && (!config.onlySlug || !/^[a-z0-9-]+$/.test(config.onlySlug))) {
  throw new Error('Pilot needs one safe exact product slug')
}

console.log('[dyasse-media] starting '+config.mode+' one-time migration; project=dyasse; source=legacy-photos')
const args = ['scripts/migrate-owned-images.mjs', '--apply', '--legacy-source',
  ...(config.mode === 'pilot' ? ['--only-slug='+config.onlySlug] : [])]
const execution = spawnSync(process.execPath, args, {
  stdio:'inherit', timeout: 32*60*1000, env:process.env,
})
if (execution.error || execution.status !== 0) {
  console.error('[dyasse-media] migration failed, preventing deployment', execution.error?.message || execution.status)
  process.exit(1)
}
console.log('[dyasse-media] migration finished and verified. Continuing application build.')
