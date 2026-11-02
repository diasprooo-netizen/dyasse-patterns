import { redirect } from 'next/navigation'
// Send checkout visitors to the live multi-pattern PayPal cart instead of an informational page.
export default function CheckoutPage(){redirect('/cart')}
