import { redirect } from 'next/navigation'
// Payments are processed securely on Gumroad only; this legacy checkout is disabled.
export default function CheckoutPage(){redirect('/faq')}
