import * as v from 'valibot'

export type BillingType = 'recurring' | 'fixed'

export type BillingFrequency = 'monthly' | 'annual' | 'custom'

const billsSchema = v.pipe(v.object({
  name: v.pipe(v.string(), v.minLength(1, 'Name is required')),
  bill_category_id: v.object({
    value: v.pipe(v.string(), v.minLength(1, 'Bill category ID is required')),
    label: v.string()
  }),
  description: v.optional(v.string()),
  amount: v.pipe(v.number(), v.minValue(1, 'Amount must be more than zero')),
  currency: v.pipe(v.string(), v.minLength(1, 'Currency is required')),
  billing_type: v.pipe(v.picklist(['recurring', 'fixed']), v.minLength(1, 'Billing type is required')),
  frequency: v.optional(v.picklist(['monthly', 'annual', 'custom'])),
  custom_frequency_days: v.nullish(v.number()),
  notes: v.optional(v.string()),
  attachment_url: v.optional(v.string()),
  due_date: v.pipe(v.string(), v.minLength(1, 'Due date is required'))
}), v.forward(
  v.partialCheck(
    [['billing_type'], ['frequency']],
    (input) => {
      if (input.billing_type === 'recurring') {
        return input.frequency === 'monthly'
          || input.frequency === 'annual'
          || input.frequency === 'custom'
      }
      return true
    },
    'Frequency is required when billing type is recurring.'
  ),
  ['frequency']
), v.forward(
  v.partialCheck(
    [['frequency'], ['custom_frequency_days']],
    (input) => {
      if (input.frequency === 'custom') {
        return input.custom_frequency_days as number >= 1
      }
      return true
    },
    'Custom frequency days must be at least 1 when frequency is set to custom.'
  ),
  ['custom_frequency_days']
))

type InferedBillsSchema = v.InferOutput<typeof billsSchema>

export { billsSchema }
export type { InferedBillsSchema }
