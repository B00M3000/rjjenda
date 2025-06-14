import { Sequelize, DataTypes } from 'sequelize'
import { Warning } from './warning'

export default (sequelize: Sequelize) => {
  Warning.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    assignmentWeight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    studentId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    due: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Warning',
    tableName: 'warnings',
    timestamps: true
  })
  // No associations needed for Warning
  return Warning
}