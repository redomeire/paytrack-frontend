import * as v from 'valibot'

export type BillingType = 'recurring' | 'fixed'

export type BillingFrequency = 'monthly' | 'annual' | 'custom'

const billSeries = v.pipe(v.object({
  name: v.pipe(v.string(), v.minLength(1, 'Name is required')),
  bill_category_id: v.object({
    value: v.pipe(v.string(), v.minLength(1, 'Bill category ID is required')),
    label: v.string()
  }),
  description: v.nullable(v.string()),
  currency: v.pipe(v.string(), v.minLength(1, 'Currency is required')),
  amount: v.pipe(v.number(), v.minValue(1, 'Amount must be more than zero')),
  frequency: v.optional(v.picklist(['monthly', 'annual', 'custom'])),
  frequency_interval: v.optional(v.number()),
  custom_frequency_days: v.nullish(v.number()),
  attachment_url: v.optional(v.string()),
  due_day: v.pipe(v.number(), v.minValue(1, 'Due date is required'), v.maxValue(31, 'Due date cannot be more than 31')),
  start_date: v.pipe(v.string(), v.minLength(1, 'Start date is required')),
  is_active: v.boolean()
}), v.forward(
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

type InferedBillSeries = v.InferOutput<typeof billSeries>

export { billSeries }
export type { InferedBillSeries }
