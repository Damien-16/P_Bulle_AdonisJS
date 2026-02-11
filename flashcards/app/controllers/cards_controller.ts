import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'
import Card from '#models/card'
import { createCardValidator } from '#validators/card'

export default class CardsController {
  /**
   * Etape 1 : Afficher le formulaire
   * On récupère l'ID du deck via l'URL pour savoir où ajouter la carte
   */
  async create({ params, view }: HttpContext) {
    // On cherche le deck pour pouvoir afficher son nom dans la vue
    const deck = await Deck.findOrFail(params.deckId)

    return view.render('pages/cards/create', { deck })
  }

  /**
   * Etape 2 : Enregistrer la carte
   */
  async store({ request, response, session }: HttpContext) {
    // 1. Validation des données via VineJS
    const payload = await request.validateUsing(createCardValidator)

    // 2. Création de la carte
    await Card.create(payload)

    // 3. Message de succès et redirection vers le Deck
    session.flash('success', 'La carte a été ajoutée avec succès !')
    return response.redirect().toRoute('decks.show', { id: payload.deckId })
  }
  /* Supprimer la carte  */
  async destroy({ params, response, session }: HttpContext) {
    const card = await Card.findOrFail(params.id)
    const deckId = card.deckId
    await card.delete()

    session.flash('success', 'Carte supprimée !')
    return response.redirect().toRoute('decks.show', { id: deckId })
  }
}
