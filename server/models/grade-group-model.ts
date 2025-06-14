import { Sequelize, DataTypes } from 'sequelize'
import { GradeGroup } from './grade-group'

export default (sequelize: Sequelize) => {
  GradeGroup.init({
    year: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: true
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'GradeGroup',
    tableName: 'grade_groups',
    timestamps: false
  })
  return GradeGroup
}