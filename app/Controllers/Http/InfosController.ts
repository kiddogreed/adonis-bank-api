// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InfosController {
  public async index(){
    return 'index'
  }

  public async store(){
    return 'info added'
  }

  public async show({params}){
    return 'info' + params.id
  }

  public async update({params}){
    return 'info update' + params.id
  }

  public async destroy(){
    return 'info deleted'
  }

   
}
