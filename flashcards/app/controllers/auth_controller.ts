import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registerValidator } from '#validators/auth'

export default class AuthController {
  /**
   * Afficher le formulaire d'inscription
   */
  async showRegister({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }
  

  /**
   * Traiter l'inscription
   */
  async register({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)
    
    // Création de l'utilisateur
    const user = await User.create(payload)

    // Connecter l'utilisateur automatiquement après inscription
    await auth.use('web').login(user)

    return response.redirect().toRoute('home')
  }
}