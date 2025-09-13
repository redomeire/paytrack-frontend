export type BillStatus = 'paid' | 'unpaid' | 'overdue'

export interface IBill {
  id: string
  bill_category_id: string
  name: string
  description?: string
  amount: number
  currency: string
  due_date: string
  period?: string | null
  notes?: string
  attachment_url?: string
  status: BillStatus
  account_number?: string
  account_name?: string
  bank_code?: string
  created_at: string
  updated_at: string
}
