import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'
import { createDeckValidator } from '#validators/deck' // Import du validateur

export default class DecksController {
  // Page d'accueil : Liste des decks
  async index({ view }: HttpContext) {
    const decks = await Deck.all()
    return view.render('pages/home', { decks })
  }

  // Page détail : Un deck et ses cartes
  async show({ params, view }: HttpContext) {
    // On charge le deck ET ses cartes (preload)
    const deck = await Deck.query().where('id', params.id).preload('cards').firstOrFail()
    return view.render('pages/decks/show', { deck })
  }
  async create({ view }: HttpContext) {
    return view.render('pages/decks/create')
  }
  async store({ request, response, session }: HttpContext) {
    // 1. Validation des données
    const payload = await request.validateUsing(createDeckValidator)

    // 2. Création en base de données
    await Deck.create(payload)

    // 3. Message de succès et redirection
    session.flash('success', 'Le deck a été créé avec succès !')
    return response.redirect().toRoute('home')
  }
  async destroy({ params, response, session }: HttpContext) {
    const deck = await Deck.findOrFail(params.id)
    await deck.delete()
    session.flash('success', 'Le deck a été supprimé avec succès !')
    return response.redirect().toRoute('home')
  }
}
