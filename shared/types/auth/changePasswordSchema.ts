import * as v from 'valibot'

const changePasswordSchema = v.pipe(v.object({
  password: v.pipe(
    v.string(),
    v.minLength(8, 'Password must be at least 8 characters long'),
    v.regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/, 'Password must contain at least one uppercase letter, one number, and one special character')
  ),
  password_confirm: v.pipe(
    v.string(),
    v.minLength(8, 'Confirm password must be at least 8 characters long'),
    v.regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/, 'Confirm password must contain at least one uppercase letter, one number, and one special character')
  )
}), v.forward(
  v.partialCheck(
    [['password'], ['password_confirm']],
    (input) => input.password === input.password_confirm,
    'Password confirmation do not match.'
  ),
  ['password_confirm']
))

type InferedChangePasswordSchema = v.InferOutput<typeof changePasswordSchema>

export { changePasswordSchema }
export type { InferedChangePasswordSchema }
