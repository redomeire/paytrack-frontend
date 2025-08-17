import * as v from 'valibot'

const paymentSchema = v.pipe(v.object({
  bill_id: v.pipe(v.string(), v.minLength(1, 'Bill id is required')),
  amount: v.pipe(v.number(), v.minValue(1, 'Amount must be more than zero')),
  currency: v.pipe(v.string(), v.minLength(1, 'Currency is required')),
  paid_date: v.optional(v.string()),
  due_date: v.pipe(v.string(), v.minLength(1, 'Due date is required')),
  payment_method: v.optional(v.string()),
  payment_reference: v.optional(v.string()),
  notes: v.optional(v.string())
}), v.forward(v.partialCheck(
  [['due_date'], ['paid_date']],
  (input) => {
    if (input.due_date && input.paid_date) {
      return new Date(input.paid_date) <= new Date(input.due_date)
    }
    return true
  },
  'Paid date must be on or before the due date when both are provided.'
), ['paid_date']))

type InferedPaymentSchema = v.InferOutput<typeof paymentSchema>

export { paymentSchema }
export type { InferedPaymentSchema }
