import { DateTime } from 'luxon'
// AJOUTER 'belongsTo' ici
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
// AJOUTER cet import pour le type
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
// AJOUTER l'import du modèle Deck
import Deck from '#models/deck'

export default class Card extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare question: string

  @column()
  declare answer: string

  // --- AJOUTER CES DEUX BLOCS DANS LA CLASSE ---

  // 1. La colonne pour l'ID du deck (Clé étrangère)
  @column()
  declare deckId: number

  // 2. La relation pour récupérer les infos du Deck
  @belongsTo(() => Deck)
  declare deck: BelongsTo<typeof Deck>

  // ---------------------------------------------

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
