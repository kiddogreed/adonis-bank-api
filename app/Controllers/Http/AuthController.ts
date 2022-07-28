//import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator'
export default class AuthController {

  public async login({ request, response, auth }) {
    const data = request.only([
      'email',
      'password',
    ])
    await request.validate(LoginValidator)
    const user = await User.query()
    .where('email', data.email)
    .first()

    if (user?.verified === 0) {
      return response.badRequest('Please verify your email first.')
    }

    if (!user) {
      return response.notFound('There is no existing user with that email.')
    }

    try {
      const access = await auth.use('api').attempt(data.email, data.password, {
        expiresIn: '1days'
      })

        


      const client = await user.related('client').query().first()
      
    

      return response.ok({
        'token': access.token,
        'user': {
          'id': user?.id,
          'client_id': client?.id,
        
        }
      })
    } catch (error) {

      
      return response.unauthorized("Invalid username or password.");
    }


  }
  
}
