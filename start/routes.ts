/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/
import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', ({ response }) => {
  let message = { message: "BANK API(" + Env.get("NODE_ENV") + ")" };
  response.json(message);
})

Route.resource('info','infosController').apiOnly()



Route.post('/auth', 'AuthController.login')
Route.get('/auth/message', 'Classic/AuthController.message')

Route.put('/account/email', 'Classic/MyAccountsController.email').middleware('auth:api')
Route.put('/account/password', 'Classic/MyAccountsController.password').middleware('auth:api')
Route.put('/account/password/reset', 'Classic/MyAccountsController.reset')
Route.post('/account/password/reset-request', 'Classic/MyAccountsController.forgot')
Route.delete('/account/delete', 'Classic/MyAccountsController.destroy').middleware('auth:api')

Route.post('/email/verify', 'Classic/EmailVerificationsController.verify')
Route.post('/email/resend', 'Classic/EmailVerificationsController.resend')

Route.get('/my/profile', 'Classic/MyProfilesController.show').middleware('auth:api')
Route.put('/my/profile', 'Classic/MyProfilesController.update').middleware('auth:api')


Route.post('/registration', 'RegistrationsController.store')