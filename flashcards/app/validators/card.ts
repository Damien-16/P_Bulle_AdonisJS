import vine from '@vinejs/vine'

export const createCardValidator = vine.compile(
  vine.object({
    question: vine.string().trim().minLength(1),
    answer: vine.string().trim().minLength(1),
    deckId: vine.number(), // On doit valider que l'ID du deck est bien un nombre
  })
)
