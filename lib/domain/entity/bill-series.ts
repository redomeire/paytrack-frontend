import type { BillingFrequency } from '../../../shared/types/bills/billsSchema'

export interface IBillSeries {
  id: string
  user_id: string
  bill_category_id: string
  name: string
  description?: string
  frequency?: BillingFrequency | null
  custom_frequency_days?: number | null
  frequency_interval?: number | null // e.g., every 2 weeks, every 3 months
  due_day: number // Day of the month (1-31)
  start_date: string // When the series starts
  currency: string
  amount: number
  is_active?: boolean
  created_at: string
  updated_at: string
}
