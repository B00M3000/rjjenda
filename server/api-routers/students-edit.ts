import bodyParser from 'body-parser'
import express from 'express'
import {NewStudent, Students, StudentUpdate} from '../../api'
import {error, success} from '../api-respond'
import {importStudents} from '../csv-import/students-and-teachers'
import {GradeGroup, Group, Student, Teacher} from '../models'

const router = express.Router()
router.get('/students', (_, res) => {
	Student.findAll({
		attributes: ['id', 'firstName', 'lastName', 'username', 'year'],
		include: [{
			model: Teacher,
			attributes: ['lastName'],
			as: 'advisor'
		}],
		order: [
			['lastName', 'ASC'],
			['firstName', 'ASC']
		]
	})
		.then(students =>
			students.map(({id, firstName, lastName, username, year, advisor}) => ({
				id,
				firstName,
				lastName,
				username,
				year,
				advisor: advisor === null ? '' : advisor.lastName
			}))
		)
		.then((response: Students) => success(res, response))
		.catch(error(res))
})
interface IdParams {
	id: string
}
router.delete('/student/:id', (req, res) => {
	const {id} = req.params as IdParams
	Student.destroy({
		where: {id}
	})
		.then(() => success(res))
		.catch(error(res))
})
router.post('/student/:id/update',
	bodyParser.json(),
	(req, res) => {
		const {id} = req.params as IdParams
		const {attribute, value} = req.body as StudentUpdate
		Student.findOne({
			attributes: ['id', 'year'],
			where: {id}
		})
			.then(student => {
				if (student === null) throw new Error('No such student id: ' + id)
				const oldYear = student.year
				return student.set({ [attribute]: value }).save()
					.then((): Promise<any> => {
						if (attribute === 'year') {
							const newYear = value
							const removeFromOldGroup = GradeGroup.findOne({
								attributes: [],
								where: {year: oldYear},
								include: [{
									model: Group,
									attributes: ['id']
								}]
							})
								.then(gradeGroup => {
									if (gradeGroup === null) throw new Error('Old grade group nonexistant')
									return gradeGroup.group.removeStudent(student)
								})
							const addToNewGroup = GradeGroup.findOrCreate({
								attributes: [],
								where: {year: newYear},
								defaults: {year: newYear},
								include: [{
									model: Group,
									attributes: ['id']
								}]
							})
								.then(([gradeGroup, created]) => {
									let groupPromise: PromiseLike<Group>
									if (created) {
										groupPromise = Group.create({
											name: 'Class of ' + String(newYear),
											sectionId: null
										})
											.then(group =>
												gradeGroup.set('groupId', group.id!)
													.save()
													.then(() => group)
											)
									}
									else groupPromise = Promise.resolve(gradeGroup.group)
									return groupPromise.then(group => group.addStudent(student))
								})
							return Promise.all([removeFromOldGroup, addToNewGroup])
						}
						else return Promise.resolve()
					})
			})
			.then(() => success(res))
			.catch(error(res))
	}
)
router.get('/student/set-advisor/:id/:advisorId', (req, res) => {
	const {id, advisorId} = req.params as {[param: string]: string}
	Student.findOne({
		attributes: ['id'],
		where: {id}
	})
		.then(student => {
			if (student === null) throw new Error('No such student id: ' + id)
			student.set('advisorId', advisorId).save()
		})
		.then(() => success(res))
		.catch(error(res))
})
router.post('/student',
	bodyParser.json(),
	(req, res) => {
		const newStudentInfo = req.body as NewStudent
		importStudents([newStudentInfo], true)
			.then(() => success(res))
			.catch(error(res))
	}
)

export default router