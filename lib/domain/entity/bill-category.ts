export interface IBillCategory {
  id: string
  name: string
  description?: string
  icon?: string
  color?: string
  is_default?: boolean
  created_at: Date
  updated_at: Date
}
