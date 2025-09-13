import * as v from 'valibot'

export type RecipientAccountType = 'recurring' | 'fixed'

const recipientAccountsSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1, 'Name is required')),
  type: v.picklist(['BANK_ACCOUNT', 'EWALLET']),
  default: v.boolean(),
  account_number: v.pipe(v.string(), v.minLength(1, 'Account number is required'))
})

type InferedRecipientAccountsSchema = v.InferOutput<typeof recipientAccountsSchema>

export { recipientAccountsSchema }
export type { InferedRecipientAccountsSchema }
