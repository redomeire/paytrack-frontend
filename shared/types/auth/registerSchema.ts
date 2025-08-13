import * as v from 'valibot'

const registerSchema = v.pipe(v.object({
  email: v.pipe(v.string(), v.email('Invalid email')),
  password: v.pipe(v.string(), v.minLength(8, 'Password must be at least 8 characters')),
  password_confirm: v.pipe(v.string(), v.minLength(8, 'Confirm password must be at least 8 characters')),
  first_name: v.pipe(v.string(), v.minLength(1, 'First name is required')),
  last_name: v.pipe(v.string(), v.minLength(1, 'Last name is required')),
  phone: v.pipe(v.string(), v.minLength(1, 'Phone number is required')),
  timezone: v.string(),
  currency: v.string()
}), v.forward(
  v.partialCheck(
    [['password'], ['password_confirm']],
    (input) => input.password === input.password_confirm,
    'Password confirmation do not match.'
  ),
  ['password_confirm']
))

type Schema = v.InferOutput<typeof registerSchema>

export { registerSchema }
export type { Schema as RegisterSchema }
