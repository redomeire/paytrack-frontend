import * as v from 'valibot'

export enum BillingType {
  RECURRING = 'recurring',
  ONE_TIME = 'one-time',
  FIXED = 'fixed'
}

export enum BillingFrequency {
  MONTHLY = 'monthly',
  ANNUAL = 'annual',
  CUSTOM = 'custom'
}

const billsSchema = v.pipe(v.object({
  name: v.pipe(v.string(), v.minLength(1, 'Name is required')),
  bill_category_id: v.object({
    value: v.pipe(v.string(), v.minLength(1, 'Bill category ID is required')),
    label: v.string()
  }),
  description: v.optional(v.string()),
  amount: v.pipe(v.number(), v.minValue(1, 'Amount must be more than zero')),
  currency: v.pipe(v.string(), v.minLength(1, 'Currency is required')),
  billing_type: v.pipe(v.enum(BillingType), v.minLength(1, 'Billing type is required')),
  frequency: v.optional(v.enum(BillingFrequency)),
  custom_frequency_days: v.optional(v.number()),
  notes: v.optional(v.string()),
  attachment_url: v.optional(v.string()),
  due_date: v.pipe(v.string(), v.minLength(1, 'Due date is required'))
}), v.forward(
  v.partialCheck(
    [['frequency'], ['custom_frequency_days']],
    (input) => {
      if (input.frequency === BillingFrequency.CUSTOM) {
        return input.custom_frequency_days !== undefined && input.custom_frequency_days >= 1
      }
      return true
    },
    'Custom frequency days must be at least 1 when frequency is set to CUSTOM.'
  ),
  ['custom_frequency_days']
))

type InferedBillsSchema = v.InferOutput<typeof billsSchema>

export { billsSchema }
export type { InferedBillsSchema }
