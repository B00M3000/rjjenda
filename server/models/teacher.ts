import { Model, Optional } from 'sequelize'
import { Group } from './group'

export interface TeacherAttributes {
  id: string //Commonwealth-assigned teacher ID (e.g. T1234)
  firstName: string //e.g. Alex
  lastName: string //e.g. Lew
  username: string //e.g. alew
  admin: boolean //whether teacher has admin privileges
  admissions: boolean //whether teacher has admissions privileges
}

export interface TeacherCreationAttributes extends Optional<TeacherAttributes, never> {}

export class Teacher extends Model<TeacherAttributes, TeacherCreationAttributes> implements TeacherAttributes {
  public id!: string
  public firstName!: string
  public lastName!: string
  public username!: string
  public admin!: boolean
  public admissions!: boolean

  public groups?: Group[]
  public addGroup?: (group: Group) => Promise<void>
  public removeGroup?: (group: Group) => Promise<void>
}