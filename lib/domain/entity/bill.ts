import type { BillingFrequency, BillingType } from '../../../shared/types/bills/billsSchema'

export interface IBill {
  id: string
  user_id: string
  bill_category_id: string
  name: string
  description?: string
  amount: number
  currency: string
  billing_type: BillingType
  frequency?: BillingFrequency | null
  custom_frequency_days?: number | null
  due_date: string
  notes?: string
  attachment_url?: string
  created_at: string
  updated_at: string
}
