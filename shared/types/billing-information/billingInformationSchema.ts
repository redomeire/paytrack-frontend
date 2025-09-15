import * as v from 'valibot'

const billingInformationSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1, 'Name is required')),
  type: v.picklist(['BANK_ACCOUNT', 'EWALLET']),
  default: v.boolean(),
  account_number: v.pipe(v.string(), v.minLength(1, 'Account number is required'))
})

type InferedBillingInformationSchema = v.InferOutput<typeof billingInformationSchema>

export { billingInformationSchema }
export type { InferedBillingInformationSchema }
