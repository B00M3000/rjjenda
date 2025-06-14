import { Sequelize, DataTypes } from 'sequelize'
import { Course } from './course'

export default (sequelize: Sequelize) => {
  Course.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Course',
    tableName: 'courses',
    timestamps: true
  })
  return Course
}