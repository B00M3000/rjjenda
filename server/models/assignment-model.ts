import { Sequelize, DataTypes } from 'sequelize'
import { Assignment } from './assignment'

export default (sequelize: Sequelize) => {
  Assignment.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    due: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    visitors: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Assignment',
    tableName: 'assignments',
    timestamps: true
  })
  return Assignment
}