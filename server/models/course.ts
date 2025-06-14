import { Model, Optional } from 'sequelize'
import { Section } from './section'

export interface CourseAttributes {
  id: string
  name: string
}

export interface CourseCreationAttributes extends Optional<CourseAttributes, never> {}

export class Course extends Model<CourseAttributes, CourseCreationAttributes> implements CourseAttributes {
  public id!: string
  public name!: string
  public sections?: Section[]
}