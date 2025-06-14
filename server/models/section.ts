import { Model, Optional } from 'sequelize'
import { Course } from './course'
import { Group } from './group'
import { Teacher } from './teacher'

export interface SectionAttributes {
  id?: number
  courseId?: string
  number?: number
  periods?: string | null
  teacherId?: string
}

export interface SectionCreationAttributes extends Optional<SectionAttributes, 'id'> {}

export class Section extends Model<SectionAttributes, SectionCreationAttributes> implements SectionAttributes {
  public id!: number
  public courseId?: string
  public number?: number
  public periods?: string | null
  public teacherId?: string

  public course?: Course
  public group?: Group
  public teacher?: Teacher | null
}