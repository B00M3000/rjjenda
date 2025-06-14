import { Sequelize, DataTypes } from 'sequelize'
import { Teacher } from './teacher'

export default (sequelize: Sequelize) => {
  Teacher.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      validate: { is: /^T/ }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    admissions: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Teacher',
    tableName: 'teachers',
    timestamps: true
  })
  return Teacher
}