import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3),
    email: vine.string().email().unique({ table: 'users', column: 'email' }),
    password: vine.string().minLength(8)
  })
)