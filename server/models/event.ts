import { Model, Optional } from 'sequelize'

export interface EventAttributes {
	id?: number //arbitrary
	start: Date | string //querying returns them as 'YYYY-MM-DD'; inclusive
	end: Date | string //exclusive
	name: string
}

export interface EventCreationAttributes extends Optional<EventAttributes, 'id'> {}

export class Event extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {
	public id!: number
	public start!: Date | string
	public end!: Date | string
	public name!: string
}