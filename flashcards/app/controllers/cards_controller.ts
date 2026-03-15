import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'
import Card from '#models/card'
import { createCardValidator } from '#validators/card'

export default class CardsController {
  /**
   * Etape 1 : Afficher le formulaire
   * On récupère l'ID du deck via l'URL pour savoir où ajouter la carte
   */
  async create({ params, view, auth }: HttpContext) {
    // On cherche le deck et on vérifie que c'est l'utilisateur connecté
    const deck = await Deck.query()
      .where('id', params.deckId)
      .where('user_id', auth.user!.id)
      .firstOrFail()

    return view.render('pages/cards/create', { deck })
  }

  /**
   * Etape 2 : Enregistrer la carte
   */
  async store({ request, response, session, auth }: HttpContext) {
    // 1. Validation des données via VineJS
    const payload = await request.validateUsing(createCardValidator)

    // 2. Vérifier que le deck appartient à l'utilisateur connecté
    await Deck.query()
      .where('id', payload.deckId)
      .where('user_id', auth.user!.id)
      .firstOrFail()

    // 3. Création de la carte
    await Card.create(payload)

    // 4. Message de succès et redirection vers le Deck
    session.flash('success', 'La carte a été ajoutée avec succès !')
    return response.redirect().toRoute('decks.show', { id: payload.deckId })
  }

  /* Supprimer la carte  */
  async destroy({ params, response, session, auth }: HttpContext) {
    const card = await Card.findOrFail(params.id)
    const deckId = card.deckId

    // Vérifier que le deck appartient à l'utilisateur connecté
    await Deck.query()
      .where('id', deckId)
      .where('user_id', auth.user!.id)
      .firstOrFail()

    await card.delete()

    session.flash('success', 'Carte supprimée !')
    return response.redirect().toRoute('decks.show', { id: deckId })
  }

  /**
   * Afficher le formulaire d'édition avec les données existantes
   */
  async edit({ params, view, auth }: HttpContext) {
    // On récupère la carte pour pré-remplir le formulaire
    const card = await Card.findOrFail(params.id)

    // Vérifier que le deck appartient à l'utilisateur connecté
    await Deck.query()
      .where('id', card.deckId)
      .where('user_id', auth.user!.id)
      .firstOrFail()

    return view.render('pages/cards/edit', { card })
  }

  /**
   * Traiter la mise à jour
   */
  async update({ params, request, response, session, auth }: HttpContext) {
    // 1. On récupère la carte cible
    const card = await Card.findOrFail(params.id)

    // 2. Vérifier que le deck appartient à l'utilisateur connecté
    await Deck.query()
      .where('id', card.deckId)
      .where('user_id', auth.user!.id)
      .firstOrFail()

    // 3. On valide les nouvelles données
    const payload = await request.validateUsing(createCardValidator)

    // 4. On fusionne les nouvelles données et on sauvegarde
    card.merge(payload)
    await card.save()

    // 5. Confirmation et redirection
    session.flash('success', 'Carte modifiée avec succès !')
    return response.redirect().toRoute('decks.show', { id: card.deckId })
  }
}
