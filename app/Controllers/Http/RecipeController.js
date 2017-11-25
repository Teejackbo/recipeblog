'use strict'

const Recipe = use('App/Models/Recipe')

const { validate } = use('Validator')

class RecipeController {

  async index({ view }) {
    const recipes = await Recipe.all()
    return view.render('recipes.index', {
      pageTitle: 'Recipes',
      recipes: recipes.toJSON()
    })
  }

  async read({ params, view }) {
    const recipe = await Recipe.find(params.id)

    return view.render('recipes.read', {
      pageTitle: recipe.title,
      recipe: recipe.toJSON()
    })
  }

  async add({ view }) {
    return view.render('recipes.add', {
      pageTitle: 'Add a Recipe'
    })
  }

  async store({ request, response, session }) {
    const validation = await validate(request.all(), {
      title: 'required|min:3|max:50',
      description: 'required|min:3|max:800',
      body: 'required|min:10'
    })

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }

    const recipe = new Recipe();
    recipe.title = request.input('title')
    recipe.description = request.input('description')
    recipe.body = request.input('body')

    await recipe.save()

    session.flash({ notification: 'Recipe saved.' })

    return response.redirect('/recipes')
  }

  async destroy({ params, response, session }) {
    const recipe = await Recipe.find(params.id)
    await recipe.delete()
    session.flash({ notification: 'Recipe deleted.' })
    return response.redirect('/recipes')
  }
}

module.exports = RecipeController
