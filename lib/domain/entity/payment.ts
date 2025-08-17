export interface IPayment {
  id: string
  bill_id: string
  amount: number
  currency: string
  paid_date?: string
  due_date: string
  payment_method?: string
  payment_reference?: string
  notes?: string
  created_at: string
  updated_at: string
}
