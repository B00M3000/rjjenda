import { Sequelize, DataTypes } from 'sequelize'
import { Student } from './student'

export default (sequelize: Sequelize) => {
  Student.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      validate: { is: /^S/ }
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
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    advisor: {
      type: DataTypes.STRING,
      allowNull: true
    },
    advisorId: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Student',
    tableName: 'students',
    timestamps: true
  })
  return Student
}