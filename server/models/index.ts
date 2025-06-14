import { Sequelize } from 'sequelize'
import fs from 'fs'
import dotenv from 'dotenv'
import { Student } from './student'
import { Teacher } from './teacher'
import { Course } from './course'
import { Section } from './section'
import { Group } from './group'
import { Assignment } from './assignment'
import { Limit } from './limit'
import { Warning } from './warning'
import { GradeGroup } from './grade-group'
import { Event } from './event'
import StudentModel from './student-model'
import TeacherModel from './teacher-model'
import CourseModel from './course-model'
import SectionModel from './section-model'
import GroupModel from './group-model'
import AssignmentModel from './assignment-model'
import LimitModel from './limit-model'
import WarningModel from './warning-model'
import GradeGroupModel from './grade-group-model'
import EventModel from './event-model'

dotenv.config()
const { DB_USERNAME, DB_DATABASE, DB_DIALECT, DB_PROTOCOL, DB_PORT, DB_HOST, DB_OPERATORS_ALIASES, DB_PASSWORD, DB_CA_PATH } = process.env
const config = {
  username: DB_USERNAME,
  database: DB_DATABASE,
  dialect: DB_DIALECT,
  protocol: DB_PROTOCOL,
  port: parseInt(DB_PORT),
  host: DB_HOST,
  operatorsAliases: DB_OPERATORS_ALIASES == "true",
  password: DB_PASSWORD,
  dialectOptions: {
    ssl: {
      ca: fs.readFileSync(DB_CA_PATH, 'utf8')
    }
  }
}

const sequelize = new Sequelize(config as any)

// Initialize all models
StudentModel(sequelize)
TeacherModel(sequelize)
CourseModel(sequelize)
SectionModel(sequelize)
GroupModel(sequelize)
AssignmentModel(sequelize)
LimitModel(sequelize)
WarningModel(sequelize)
GradeGroupModel(sequelize)
EventModel(sequelize)

// Set up associations directly
// Teacher - Student
Teacher.hasMany(Student, { as: 'Advisees', foreignKey: 'advisorId' })
Student.belongsTo(Teacher, { as: 'advisor' })
// Teacher - Section
Teacher.hasMany(Section)
Section.belongsTo(Teacher)
// Teacher - Group (displays)
Teacher.belongsToMany(Group, { through: 'displays' })
// Student - Group (memberships)
Student.belongsToMany(Group, { through: 'memberships' })
Group.belongsToMany(Student, { through: 'memberships' })
// Course - Section
Course.hasMany(Section, { onDelete: 'CASCADE' })
Section.belongsTo(Course)
// Section - Group
Section.hasOne(Group, { onDelete: 'CASCADE' })
Group.belongsTo(Section)
// Group - Assignment
Group.hasMany(Assignment, { onDelete: 'CASCADE' })
Assignment.belongsTo(Group)
// GradeGroup - Group
GradeGroup.belongsTo(Group, { foreignKey: 'groupId' })
// ... Add other associations as needed ...

export {
  sequelize,
  Student,
  Teacher,
  Course,
  Section,
  Group,
  Assignment,
  Limit,
  Warning,
  GradeGroup,
  Event
  // ... Add other exports as needed ...
}