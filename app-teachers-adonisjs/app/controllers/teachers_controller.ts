import Teacher from '#models/teacher'
import type { HttpContext } from '@adonisjs/core/http'
export default class TeachersController {
  /**
  * Afficher la liste des enseignants
  */
  async index({ view }: HttpContext) {
    //
    // Récupérer la liste des enseignants triés par ordre alphabétique sur le nom et le prénom
    const teachers = await Teacher.query().orderBy('lastname',
      'asc').orderBy('firstname', 'asc')
    // Appel de la vue
    return view.render('pages/home', { teachers })
  }

  /**
 * Afficher les détails d'un enseignant (y compris le nom de sa section)
 */
  async show({ params, view }: HttpContext) {
    // Sélectionner l'enseignant dont on veut afficher les détails
    const teacher = await Teacher.query().where('id', params.id).preload('section').firstOrFail()
    // Afficher la vue
    return view.render('pages/teachers/show.edge', { title: "Détail d'un enseignant", teacher })
  }
  /**
  * Display form to create a new record
  */
  async create({ }: HttpContext) { }
  /**
  * Handle form submission for the create action
  */
  async store({ request }: HttpContext) { }
  /**
  * Edit individual record
  */
  async edit({ params }: HttpContext) { }
  /**
  * Handle form submission for the edit action
  */
  async update({ params, request }: HttpContext) { }
  /**
  * Delete record
  */
  async destroy({ params }: HttpContext) { }
}
