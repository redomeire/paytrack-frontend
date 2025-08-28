import * as v from 'valibot'

export type BillingType = 'recurring' | 'fixed'

export type BillingFrequency = 'monthly' | 'annual' | 'custom'

const billsSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1, 'Name is required')),
  bill_category_id: v.object({
    value: v.pipe(v.string(), v.minLength(1, 'Bill category ID is required')),
    label: v.string()
  }),
  description: v.optional(v.string()),
  amount: v.pipe(v.number(), v.minValue(1, 'Amount must be more than zero')),
  currency: v.pipe(v.string(), v.minLength(1, 'Currency is required')),
  notes: v.optional(v.string()),
  attachment_url: v.optional(v.string()),
  due_date: v.pipe(v.string(), v.minLength(1, 'Due date is required')),
  period: v.nullable(v.string())
})

type InferedBillsSchema = v.InferOutput<typeof billsSchema>

export { billsSchema }
export type { InferedBillsSchema }
