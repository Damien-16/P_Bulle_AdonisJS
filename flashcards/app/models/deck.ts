import { DateTime } from 'luxon'
// AJOUTER 'hasMany' ici dans la liste des imports
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
// AJOUTER cet import pour le type
import type { HasMany } from '@adonisjs/lucid/types/relations'
// AJOUTER l'import du modèle Card
import Card from '#models/card'

export default class Deck extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  // --- AJOUTER CE BLOC DANS LA CLASSE ---
  @hasMany(() => Card)
  declare cards: HasMany<typeof Card>
  // --------------------------------------

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
