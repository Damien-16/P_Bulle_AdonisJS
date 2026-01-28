// import type { HttpContext } from '@adonisjs/core/http'
import type { HttpContext } from '@adonisjs/core/http'
import Section from '#models/section'
import { dd } from '@adonisjs/core/services/dumper'
import { sectionValidator } from '#validators/section'

export default class SectionsController {
  async index({ view }: HttpContext) {
    //
    // Récupérer la liste des enseignants triés par ordre alphabétique sur le nom et le prénom
    const sections = await Section.all()
    // Appel de la vue
    return view.render('pages/sections', { sections })
  }

  async create({ view }: HttpContext) {
    //dd('test')

    return view.render('pages/sections/add', { title: "Ajout d'une section" })
  }

  async store({ response, request, session }: HttpContext) {
    const { name } = await request.validateUsing(sectionValidator)
    const teacher = await Section.create({
      name,
    })
    session.flash('success', `La nouvelle section ${Section.name} a été ajouté avec succès !`)
    return response.redirect().toRoute('section.index')
  }

  async destroy({ params, session, response }: HttpContext) {
    const section = await Section.findOrFail(params.id)
    // Supprime l'enseignant
    await section.delete()
    session.flash('success', `La section ${section.name} a été supprimé avec succès !`)
    return response.redirect().toRoute('section.index')
  }
}
