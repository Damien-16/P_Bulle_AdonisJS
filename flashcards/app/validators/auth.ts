import vine from '@vinejs/vine'

// Validation pour la connexion d'un utilisateur
const loginUserValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(4),
    password: vine.string().minLength(8),
  })
)

// Validation pour l'inscription d'un utilisateur
const registerUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(4).maxLength(50),
    password: vine.string().minLength(8),
  })
)

export { loginUserValidator, registerUserValidator }
