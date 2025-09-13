export type RecipientAccountType = 'BANK_ACCOUNT' | 'EWALLET'

export interface IRecipientAccount {
  id: string
  user_id: string
  name: string
  type: RecipientAccountType
  details: string
  default: boolean
  created_at: string
  updated_at: string
}
