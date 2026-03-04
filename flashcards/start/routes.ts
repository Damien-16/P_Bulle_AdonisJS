/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import DecksController from '#controllers/decks_controller'
import CardsController from '#controllers/cards_controller'
import AuthController from '#controllers/auth_controller'
//.use(middleware.auth()) seulement pour utilisateur connecté
//.use(middleware.guest()) seulement pour les utilisateurs non connectés
router.get('/', [DecksController, 'index']).as('home').use(middleware.auth())

//routes des decks
router.get('/deck/:id', [DecksController, 'show']).as('decks.show').use(middleware.auth())
router.get('/decks/create', [DecksController, 'create']).as('decks.create').use(middleware.auth())
router.post('/decks', [DecksController, 'store']).as('decks.store').use(middleware.auth())
router
  .delete('/decks/:id/', [DecksController, 'destroy'])
  .as('decks.destroy')
  .use(middleware.auth())
router.get('/decks/:id/edit', [DecksController, 'edit']).as('decks.edit').use(middleware.auth())
router.put('/decks/:id', [DecksController, 'update']).as('decks.update').use(middleware.auth())
router.get('/decks/:id/learn', [DecksController, 'learn']).as('decks.learn').use(middleware.auth())

router
  .get('/decks/:deckId/cards-add', [CardsController, 'create'])
  .as('cards.create')
  .use(middleware.auth())
//routes des cartes
router.post('/cards', [CardsController, 'store']).as('cards.store').use(middleware.auth())
router.delete('/cards/:id', [CardsController, 'destroy']).as('cards.destroy').use(middleware.auth())
router.get('/cards/:id/edit', [CardsController, 'edit']).as('cards.edit').use(middleware.auth())
router.put('/cards/:id', [CardsController, 'update']).as('cards.update').use(middleware.auth())

//routes d'authentification
router
  .get('/register', [AuthController, 'showRegister'])
  .as('auth.showRegister')
  .use(middleware.guest())
router.post('/register', [AuthController, 'register']).as('auth.register').use(middleware.guest())

router.post('/login', [AuthController, 'login']).as('auth.login')
router.post('/logout', [AuthController, 'logout']).as('auth.logout')
router.get('/login', [AuthController, 'showLogin']).as('auth.showLogin').use(middleware.guest())
