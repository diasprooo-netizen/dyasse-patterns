import Link from "next/link"
import Header from "@/components/Header"

type LoginPageProps = {
  searchParams?: {
    next?: string
    error?: string
  }
}

function safeNext(value?: string) {
  if (!value) return "/admin"
  if (!value.startsWith("/") || value.startsWith("//")) return "/admin"
  return value
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const next = safeNext(searchParams?.next)
  const error = searchParams?.error ? decodeURIComponent(searchParams.error) : ""

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-md rounded-lg border border-border bg-white p-8 shadow-xl">
          <h1 className="text-center text-3xl font-bold text-foreground">
            Sign In
          </h1>

          <p className="mt-2 text-center text-muted-foreground">
            Access your admin dashboard.
          </p>

          {error ? (
            <p className="mt-6 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <form action="/auth/signin" method="post" className="mt-8 space-y-4">
            <input type="hidden" name="next" value={next} />

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="dias.prooo@gmail.com"
                required
                className="w-full rounded-md border border-border bg-white px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                className="w-full rounded-md border border-border bg-white px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              className="h-10 w-full rounded-md bg-emerald-500 font-semibold text-slate-950 hover:bg-emerald-400"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 border-t border-border pt-6 text-center">
            <Link href="/" className="text-sm font-semibold text-primary hover:underline">
              Back to shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
