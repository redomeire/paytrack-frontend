import * as v from 'valibot'

const forgotPasswordSchema = v.object({
  email: v.pipe(v.string(), v.email('Invalid email'))
})

type InferedForgotPasswordSchema = v.InferOutput<typeof forgotPasswordSchema>

export { forgotPasswordSchema }
export type { InferedForgotPasswordSchema }
