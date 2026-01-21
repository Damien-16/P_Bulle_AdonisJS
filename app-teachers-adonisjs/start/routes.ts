/*
|--------------------------------------------------------------------------
| Le fichier des routes
|--------------------------------------------------------------------------
|
| Le fichier des routes a pour but de définir toutes les routes HTTP.
|
*/
import TeachersController from '#controllers/teachers_controller'
import router from '@adonisjs/core/services/router'
router.get('/', [TeachersController, 'index']).as('home')
router.get('/teacher/:id/show', [TeachersController, 'show']).as('teacher.show')
// Route permettant de supprimer un enseignant
router.delete('/teacher/:id/destroy', [TeachersController, 'destroy']).as('teacher.destroy')
// Route permettant d'afficher le formulaire permettant l'ajout d'un enseignant
router.get('/teacher/add', [TeachersController, 'create']).as('teacher.create')
// Route permettant l'ajout de l'enseignant
router.post('/teacher/add', [TeachersController, 'store']).as('teacher.store')