// Minimal typed Supabase public schema for the Dyasse initial migration.
// Replace with generated Supabase types after creating the live database.
type Table = {
  Row: Record<string, any>
  Insert: Record<string, any>
  Update: Record<string, any>
  Relationships: []
}
export type Database = {
  public: {
    Tables: {
      products: Table
      admin_users: Table
      qa_audits: Table
      newsletter_subscribers: Table
      checkout_clicks: Table
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
