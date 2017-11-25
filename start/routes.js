'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route.on('/').render('home')
Route.get('/recipes', 'RecipeController.index')
Route.get('/recipes/:id', 'RecipeController.read')
Route.delete('/recipes/:id', 'RecipeController.destroy')