import { redirect } from 'next/navigation'

/** Old marketplace import was retired once the Dyasse-owned catalog migrated. */
export default function RetiredCatalogImport() {
  redirect('/admin/products')
}
