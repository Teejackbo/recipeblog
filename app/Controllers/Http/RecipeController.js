'use strict'

const Recipe = use('App/Models/Recipe')

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

  async destroy({ params, response, session }) {
    const recipe = await Recipe.find(params.id)
    await recipe.delete()
    session.flash({ notification: 'Recipe deleted.' })
    return response.redirect('/recipes')
  }
}

module.exports = RecipeController
