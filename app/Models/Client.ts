import { DateTime } from 'luxon'
import {  BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number


  @column()
  public companyId: number | null

  @column()
  public firstName: string

  @column()
  public middleName: string

  @column()
  public lastName: string

  @column()
  public branch: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey:'profileId'
  })
  public user: BelongsTo<typeof User>
}
