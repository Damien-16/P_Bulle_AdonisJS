import vine from '@vinejs/vine'
export const createDeckValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(50),
  })
)
