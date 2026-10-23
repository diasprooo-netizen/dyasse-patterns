import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

function safeNextPath(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return "/admin"
  if (!value.startsWith("/") || value.startsWith("//")) return "/admin"
  return value
}

export async function POST(request: NextRequest) {
  const formData = await request.formData()

  const email = String(formData.get("email") || "").trim()
  const password = String(formData.get("password") || "")
  const next = safeNextPath(formData.get("next"))

  const loginUrl = new URL("/account/login", request.url)
  loginUrl.searchParams.set("next", next)

  if (!email || !password) {
    loginUrl.searchParams.set("error", "Email and password are required.")
    return NextResponse.redirect(loginUrl, { status: 303 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    loginUrl.searchParams.set("error", "Missing Supabase environment variables.")
    return NextResponse.redirect(loginUrl, { status: 303 })
  }

  const response = NextResponse.redirect(new URL(next, request.url), { status: 303 })

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        response.cookies.set({
          name,
          value,
          ...options,
          path: options?.path ?? "/",
        })
      },
      remove(name: string, options: any) {
        response.cookies.set({
          name,
          value: "",
          ...options,
          path: options?.path ?? "/",
          maxAge: 0,
        })
      },
    },
  })

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    loginUrl.searchParams.set("error", error.message)
    return NextResponse.redirect(loginUrl, { status: 303 })
  }

  return response
}
