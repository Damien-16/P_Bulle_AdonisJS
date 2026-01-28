import vine from '@vinejs/vine'
const sectionValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2),
  })
)
export { sectionValidator }
