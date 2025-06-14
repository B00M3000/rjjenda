import { Model, Optional } from 'sequelize'

export interface LimitAttributes {
  id?: number //arbitrary
  days: number //number of consecutive days limit applies to
  assignmentWeight: number //max sum of assignment weights
}

export interface LimitCreationAttributes extends Optional<LimitAttributes, 'id'> {}

export class Limit extends Model<LimitAttributes, LimitCreationAttributes> implements LimitAttributes {
  public id!: number
  public days!: number
  public assignmentWeight!: number
}