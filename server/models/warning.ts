import { Model, Optional } from 'sequelize'

export interface WarningAttributes {
  id?: number
  assignmentWeight: number
  studentId: string
  groupId: number
  due: string
  color: string
}

export interface WarningCreationAttributes extends Optional<WarningAttributes, 'id'> {}

export class Warning extends Model<WarningAttributes, WarningCreationAttributes> implements WarningAttributes {
  public id!: number
  public assignmentWeight!: number
  public studentId!: string
  public groupId!: number
  public due!: string
  public color!: string
}