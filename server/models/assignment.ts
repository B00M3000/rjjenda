import { Model, Optional } from 'sequelize'
import { Group } from './group'

export interface AssignmentAttributes {
	id?: number //arbitrary
	due: Date | string //querying returns it as 'YYYY-MM-DD'
	groupId: number
	name: string
	visitors: boolean //should visitors be allowed to class on that day
	weight: number //allows for flexibility, but currently will be 0 for minor/event and 1 for major
}

export interface AssignmentCreationAttributes extends Optional<AssignmentAttributes, 'id'> {}

export class Assignment extends Model<AssignmentAttributes, AssignmentCreationAttributes> implements AssignmentAttributes {
	public id!: number
	public due!: string
	public groupId!: number
	public name!: string
	public visitors!: boolean
	public weight!: number

	public readonly createdAt!: Date
	public readonly updatedAt!: Date

	public group?: Group
}