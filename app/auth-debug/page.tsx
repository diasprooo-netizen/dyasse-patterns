import { notFound } from 'next/navigation'
// Never expose authentication session information on a public diagnostics page.
export default function LegacyAuthDebug(){notFound()}
