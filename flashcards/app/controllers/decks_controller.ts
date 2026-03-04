import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'
import { createDeckValidator } from '#validators/deck' // Import du validateur

export default class DecksController {
  /**
   * Page d'accueil : Liste des decks de l'utilisateur connecté
   */
  async index({ view, auth }: HttpContext) {
    const decks = await Deck.query()
      .where('user_id', auth.user!.id)
      .withCount('cards')
      .orderBy('updatedAt', 'desc')
    return view.render('pages/home', { decks })
  }

  // Page détail : Un deck et ses cartes (vérifier que c'est le propre deck de l'utilisateur)
  async show({ params, view, auth }: HttpContext) {
    // On charge le deck ET ses cartes (preload) ET on vérifie que c'est l'utilisateur connecté
    const deck = await Deck.query()
      .where('id', params.id)
      .where('user_id', auth.user!.id)
      .preload('cards')
      .firstOrFail()
    return view.render('pages/decks/show', { deck })
  }

  async create({ view }: HttpContext) {
    return view.render('pages/decks/create')
  }

  async store({ request, response, session, auth }: HttpContext) {
    // 1. Validation des données
    const payload = await request.validateUsing(createDeckValidator)

    // 2. Création en base de données avec le user_id de l'utilisateur connecté
    await Deck.create({
      ...payload,
      userId: auth.user!.id,
    })

    // 3. Message de succès et redirection
    session.flash('success', 'Le deck a été créé avec succès !')
    return response.redirect().toRoute('home')
  }

  async destroy({ params, response, session, auth }: HttpContext) {
    const deck = await Deck.query()
      .where('id', params.id)
      .where('user_id', auth.user!.id)
      .firstOrFail()
    await deck.delete()
    session.flash('success', 'Le deck a été supprimé avec succès !')
    return response.redirect().toRoute('home')
  }

  /**
   * Afficher le formulaire d'édition avec les données existantes
   */
  async edit({ params, view, auth }: HttpContext) {
    // On récupère le deck pour pré-remplir le formulaire et on vérifie que c'est l'utilisateur
    const deck = await Deck.query()
      .where('id', params.id)
      .where('user_id', auth.user!.id)
      .firstOrFail()

    return view.render('pages/decks/edit', { deck })
  }

  /**
   * Traiter la mise à jour
   */
  async update({ params, request, response, session, auth }: HttpContext) {
    // 1. On récupère le deck cible et on vérifie que c'est l'utilisateur connecté
    const deck = await Deck.query()
      .where('id', params.id)
      .where('user_id', auth.user!.id)
      .firstOrFail()

    // 2. On valide les nouvelles données
    const payload = await request.validateUsing(createDeckValidator)

    // 3. On fusionne les nouvelles données et on sauvegarde
    deck.merge(payload)
    await deck.save()

    // 4. Confirmation et redirection
    session.flash('success', 'Deck modifié avec succès !')
    return response.redirect().toRoute('home')
  }

  async learn({ params, view, auth }: HttpContext) {
    // Récupération du deck avec ses cartes et vérification que c'est l'utilisateur connecté
    const deck = await Deck.query()
      .where('id', params.id)
      .where('user_id', auth.user!.id)
      .preload('cards')
      .firstOrFail()

    return view.render('pages/decks/learn', { deck })
  }
}
