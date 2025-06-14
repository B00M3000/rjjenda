import { Sequelize, DataTypes } from 'sequelize'
import { Group } from './group'

export default (sequelize: Sequelize) => {
  Group.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sectionId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Group',
    tableName: 'groups',
    timestamps: true
  })
  return Group
}