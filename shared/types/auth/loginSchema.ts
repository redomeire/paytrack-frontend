import * as v from 'valibot'

const loginSchema = v.object({
  email: v.pipe(v.string(), v.email('Invalid email')),
  password: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters'))
})

type InferedLoginSchema = v.InferOutput<typeof loginSchema>

export { loginSchema }
export type { InferedLoginSchema }
