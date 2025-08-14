import * as v from 'valibot'

const billsCategorySchema = v.object({
  name: v.pipe(v.string(), v.minLength(1, 'Name is required')),
  description: v.optional(v.string()),
  color: v.optional(v.string()),
  icon: v.optional(v.string()),
  isDefault: v.optional(v.boolean())
})

type InferenBillsCategorySchema = v.InferOutput<typeof billsCategorySchema>

export { billsCategorySchema }
export type { InferenBillsCategorySchema }
