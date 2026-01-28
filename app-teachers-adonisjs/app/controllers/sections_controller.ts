// import type { HttpContext } from '@adonisjs/core/http'
import type { HttpContext } from '@adonisjs/core/http'
import section from '#models/section'
import Section from '#models/section'

export default class SectionsController {

      async index({ view }: HttpContext) {
        //
        // Récupérer la liste des enseignants triés par ordre alphabétique sur le nom et le prénom
        const sections = await section.query()
        // Appel de la vue
        return view.render('pages/home', { sections })
      }

     async sections({ view }: HttpContext) {
       // Appel de la vue
        return view.render('pages/sections', { title: "Détail d'une section",})
      }
       async create({ view }: HttpContext) {
          const sections = await Section.query().orderBy('name', 'asc')
          return view.render('pages/teachers/create', { title: "Ajout d'un enseignant", sections })
        }
}