import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client';
import User from 'App/Models/User';
import RegistrationValidator from 'App/Validators/RegistrationValidator';
export default class RegistrationsController {

  public async store({ request, response }: HttpContextContract) {
    const data = request.only([
      'email',
      'password',
      'first_name',
      'last_name',
      'company_name',
      'branch',
  
    ]);

    await request.validate(RegistrationValidator)

    
    
    

    const client = await Client.create({
      firstName: data.first_name,
      lastName: data.last_name,
      branch: data.branch
    });

    await User.create({
      profileId: client.id,
      email: data.email,
      password: data.password
    })

    // const token = string.generateRandom(20)
    // await TokenRepository.create({
    //   userId: user.id,
    //   token: token,
    //   type: 'VERIFY EMAIL'
    // })

    // const parameter = client.firstName.replace(/\s/g, "%20")
    // const url = Env.get("APP_FRONTEND_URL") + `/verify-email?token=${token}&name=${parameter}`

    // const urlShortener = new UrlShortener()
    // const shortenedUrl = await urlShortener.process(url)

    // await Bull.add(new EmailVerification().key, {
    //   email: user.email,
    //   first_name: client.firstName,
    //   last_name: client.lastName,
    //   verification_url: shortenedUrl
    // })

    // const IPs = request.ips()
    // await UserLogRepository.create({
    //   userId: user.id,
    //   ipAddress: IPs[0] ? IPs[0] : request.header("x-forwarded-for"),
    //   userAgent: request.header('user-agent'),
    //   action: 'SIGN-UP',
    //   status: 'SUCCEED'
    // })

    return response.ok('Registration successfull. Welcome on Board!')
  }
}
