import { Model, Optional } from 'sequelize'
import { Group } from './group'

export interface GradeGroupAttributes {
  year: number | null //if null, corresponds to all students; otherwise, the graduation year of this grade
  groupId?: number //the group representing this grade group
}

export interface GradeGroupCreationAttributes extends Optional<GradeGroupAttributes, 'groupId'> {}

export class GradeGroup extends Model<GradeGroupAttributes, GradeGroupCreationAttributes> implements GradeGroupAttributes {
  public year!: number | null
  public groupId?: number

  public group?: Group
}