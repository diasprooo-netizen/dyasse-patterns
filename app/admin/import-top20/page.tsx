import { redirect } from 'next/navigation'

/** Retired legacy catalog import route; use the independent product manager. */
export default function RetiredPriorityImport() {
  redirect('/admin/products')
}
