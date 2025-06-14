import { Sequelize, DataTypes } from 'sequelize'
import { Event } from './event'

export default (sequelize: Sequelize) => {
  Event.init({
    start: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    timestamps: false
  })
  return Event
}