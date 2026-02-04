import type { HttpContext } from '@adonisjs/core/http'
import Card from '#models/card'
import Deck from '#models/deck' // Import nécessaire pour le titre

export default class CardsController {
  // Afficher le formulaire
  async create({ params, view }: HttpContext) {
    const deck = await Deck.findOrFail(params.deckId)
    return view.render('pages/cards/create', { deck })
  }

  // Enregistrer la carte [cite: 132]
  async store({ request, response, session }: HttpContext) {
    const data = request.all() // Idéalement, utilisez un validateur ici (Step 8)

    await Card.create({
      question: data.question,
      answer: data.answer,
      deckId: data.deckId,
    })

    session.flash('success', 'Carte ajoutée !')
    return response.redirect().toRoute('decks.show', { id: data.deckId })
  }

  // Supprimer la carte [cite: 371]
  async destroy({ params, response, session }: HttpContext) {
    const card = await Card.findOrFail(params.id)
    const deckId = card.deckId
    await card.delete()

    session.flash('success', 'Carte supprimée !')
    return response.redirect().toRoute('decks.show', { id: deckId })
  }
}
