export type BillingInformationType = 'BANK_ACCOUNT' | 'EWALLET'

export interface IBillingInformation {
  id: string
  user_id: string
  name: string
  type: BillingInformationType
  details: string
  default: boolean
  created_at: string
  updated_at: string
}
