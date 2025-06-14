import { Model, Optional } from 'sequelize'
import { Section } from './section'
import { Student } from './student'
import { Assignment } from './assignment'

export interface GroupAttributes {
  id?: number
  sectionId: number | null
  name: string | null
}

export interface GroupCreationAttributes extends Optional<GroupAttributes, 'id'> {}

export class Group extends Model<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
  public id!: number
  public sectionId!: number | null
  public name!: string | null

  public section?: Section | null
  public students?: Student[]
  public assignments?: Assignment[]
  public studentCount?: number

  public setStudents?: (students: Student[]) => Promise<void>
  public addStudent?: (student: Student) => Promise<void>
  public removeStudent?: (student: Student) => Promise<void>
}