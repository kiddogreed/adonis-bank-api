import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {column, beforeSave, BaseModel, hasOne, HasOne  } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public profileId: number


  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public verified: number

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: false })
  public verifiedAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }


  @hasOne(() => Client, {
    localKey: 'profileId',
    foreignKey: 'id'
  })
  public client: HasOne<typeof Client>
}
