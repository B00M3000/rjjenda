import { Sequelize, DataTypes } from 'sequelize'
import { Limit } from './limit'

export default (sequelize: Sequelize) => {
  Limit.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    days: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    assignmentWeight: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Limit',
    tableName: 'limits',
    timestamps: true
  })
  // No associations needed for Limit
  return Limit
}