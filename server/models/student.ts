import { Model, Optional } from 'sequelize'
import { Group } from './group'
import { Teacher } from './teacher'

export interface StudentAttributes {
  id: string //Commonwealth-assigned student ID (e.g. S1234)
  firstName: string //e.g. Caleb
  lastName: string //e.g. Sander
  username: string //e.g. csander
  advisor: Teacher | null //advisor relationships don't exist on initial import
  advisorId?: string
  year: number //e.g. 2017
}

export interface StudentCreationAttributes extends Optional<StudentAttributes, 'advisor' | 'advisorId'> {}

export class Student extends Model<StudentAttributes, StudentCreationAttributes> implements StudentAttributes {
  public id!: string
  public firstName!: string
  public lastName!: string
  public username!: string
  public advisor!: Teacher | null
  public advisorId?: string
  public year!: number

  public groups?: Group[]
}