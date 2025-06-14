import { Sequelize, DataTypes } from 'sequelize'
import { Section } from './section'

export default (sequelize: Sequelize) => {
  Section.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    periods: {
      type: DataTypes.STRING,
      allowNull: true
    },
    courseId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    teacherId: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Section',
    tableName: 'sections',
    timestamps: true
  })
  return Section
}