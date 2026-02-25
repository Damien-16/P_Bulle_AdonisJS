/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import DecksController from '#controllers/decks_controller'
import CardsController from '#controllers/cards_controller'
import AuthController from '#controllers/auth_controller'

router.get('/', [DecksController, 'index']).as('home')
//routes des decks
router.get('/deck/:id', [DecksController, 'show']).as('decks.show')
router.get('/decks/create', [DecksController, 'create']).as('decks.create')
router.post('/decks', [DecksController, 'store']).as('decks.store')
router.delete('/decks/:id/', [DecksController, 'destroy']).as('decks.destroy')
router.get('/decks/:id/edit', [DecksController, 'edit']).as('decks.edit')
router.put('/decks/:id', [DecksController, 'update']).as('decks.update')
router.get('/decks/:id/learn', [DecksController, 'learn']).as('decks.learn')

router.get('/decks/:deckId/cards-add', [CardsController, 'create']).as('cards.create')
//routes des cartes
router.post('/cards', [CardsController, 'store']).as('cards.store')
router.delete('/cards/:id', [CardsController, 'destroy']).as('cards.destroy')
router.get('/cards/:id/edit', [CardsController, 'edit']).as('cards.edit')
router.put('/cards/:id', [CardsController, 'update']).as('cards.update')

//routes d'authentification
router.get('/register', [AuthController, 'showRegister']).as('auth.showRegister')
router.post('/register', [AuthController, 'register']).as('auth.register')
