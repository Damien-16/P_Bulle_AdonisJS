import type { HttpContext } from '@adonisjs/core/http'
import { loginUserValidator, registerUserValidator } from '#validators/auth'
import User from '#models/user'
/**
 * Controller pour l'authentification
 */
export default class AuthController {
  /**
   * Gérer la connexion d'un utilisateur
   */
  async login({ request, auth, session, response }: HttpContext) {
    // Récupère les données validées
    const { username, password } = await request.validateUsing(loginUserValidator)
    // Récupère l'utilisateur correspondant aux données saisies par l'utilisateur
    const user = await User.verifyCredentials(username, password)
    // Utilise le guard 'web' pour connecter l'utilisateur -> Voir le fichier config/auth.ts
    await auth.use('web').login(user)
    // Affiche un msg à l'utilsateur
    session.flash(
      'success',
      `L'utilisateur ${user.username} s'est connecté avec
succès`
    )
    // Redirige vers la route ayant pour nom 'home'
    return response.redirect().toRoute('home')
  }

  /**
   * Gérer la déconnexion d'un utilisateur
   */
  async logout({ auth, session, response }: HttpContext) {
    // Déconnecte l'utilisateur
    await auth.use('web').logout()
    // Affiche un message de confirmation
    session.flash('success', 'Vous avez été déconnecté avec succès')
    // Redirige vers la page d'accueil
    return response.redirect().toRoute('home')
  }

  async showRegister({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  /**
   * Créer un nouvel utilisateur
   */
  async register({ request, response, session, auth }: HttpContext) {
    // 1. Validation des données
    const payload = await request.validateUsing(registerUserValidator)

    // 2. Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findBy('username', payload.username)
    if (existingUser) {
      // Afficher un message d'erreur
      session.flash('error', "Ce nom d'utilisateur est déjà utilisé")
      return response.redirect().back()
    }

    // 3. Créer l'utilisateur
    const user = await User.create({
      username: payload.username,
      password: payload.password,
      isAdmin: false,
    })

    // 4. Connecter automatiquement l'utilisateur
    await auth.use('web').login(user)

    // 5. Message de succès et redirection
    session.flash('success', `Bienvenue ${user.username} ! Votre compte a été créé avec succès`)
    return response.redirect().toRoute('home')
  }
}
