export interface IUser {
  id: string
  email: string
  first_name: string
  last_name: string
  phone?: string
  avatar_url?: string
  timezone?: string
  currency?: string
  is_verified: number
  email_verified_at?: string
}
