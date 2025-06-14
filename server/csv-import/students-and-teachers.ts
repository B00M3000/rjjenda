import {parse, RowObject} from './csv-parse'
import {Readable} from 'stream'
import {NewStudent} from '../../api'
import {GradeGroup, Group, Student, Teacher} from '../models'

import dotenv from 'dotenv'
dotenv.config()

const { EMAIL_DOMAIN } = process.env

interface Person extends RowObject {
	'User ID': string
	'Last Name': string
	'First Name': string
	'Email ID': string
	'Role(s)': string
	'Grade Level': string
}

function getUsername(email: string) {
	const [username, domain] = email.toLowerCase().split('@')
	return {username, domain}
}
//All student creation should happen through this function
//so students are added to grade groups and all-school group
export function importStudents(students: NewStudent[], requireCreation: boolean) {
	//Get a list of all grades to which some of these students belong
	//as well as null, the all-school group
	const years = new Set<number | null>()
	years.add(null)
	for (const student of students) {
		const {year} = student
		if (year) years.add(Number(year))
	}
	//Create groups for each of the grades
	const gradeGroupCreations: PromiseLike<any>[] = []
	const gradeGroups = new Map<number | null, Group>()
	for (const year of years) {
		gradeGroupCreations.push(
			GradeGroup.findOrCreate({
				attributes: ['groupId'],
				where: {year},
				defaults: {year}
			})
				.then(([gradeGroup, created]) => {
					if (created) {
						let groupName: string
						if (gradeGroup.year === null) groupName = 'All students'
						else groupName = 'Class of ' + String(gradeGroup.year)
						return Group.create({
							name: groupName,
							sectionId: null
						})
							.then(group => {
								gradeGroup.groupId = group.id as number
								return gradeGroup.save()
									.then(() => Promise.resolve(group))
							})
					}
					else {
						return Group.findOne({
							where: {
								id: gradeGroup.groupId
							}
						})
					}
				})
				.then(group => gradeGroups.set(year, group as Group))
		)
	}
	//Instantiate all the students
	return Promise.all(gradeGroupCreations)
		.then(() => {
			const allSchoolGroup = gradeGroups.get(null) as Group
			return Promise.all(students.map(student => {
				const {id, lastName, firstName, username, year} = student
				return Student.findOrCreate({
					where: {id},
					defaults: {
						id,
						firstName,
						lastName,
						username,
						advisor: null,
						year
					}
				})
					.then(([student, created]): PromiseLike<any> => { //add student to automatic groups
						if (created) {
							const gradeGroup = gradeGroups.get(student.year) as Group
							return Promise.all([gradeGroup, allSchoolGroup].map(group =>
								group.addStudent(student)
							))
						}
						else {
							if (requireCreation) return Promise.reject(new Error('ID already in use'))
							else return Promise.resolve()
						}
					})
			}))
		})
}
export default (csvStream: Readable): Promise<string[]> =>
	parse(csvStream)
		.then(rows => {
			const people = rows as Person[]
			const students = people.filter(person => person['Role(s)'] === 'Student')
			const importStudentsPromise = importStudents(
				students.map(student => ({
					id: student['User ID'],
					firstName: student['First Name'],
					lastName: student['Last Name'],
					...getUsername(student['Email ID']),
					year: Number(student['Grade Level'])
				})),
				false
			)
			const teachers = people.filter(person => {
				const role = person['Role(s)']
				return role === 'Staff' || role === 'Teacher'
			})
			const invalidEmails: string[] = []
			const importTeachersPromise = Promise.all(teachers.map(teacher => {
				const {
					'User ID': id,
					'Last Name': lastName,
					'First Name': firstName,
					'Email ID': email
				} = teacher
				const {username, domain} = getUsername(email)
				if (domain !== EMAIL_DOMAIN) invalidEmails.push(email)
				return Teacher.findOrCreate({
					where: {id},
					defaults: {
						id,
						firstName,
						lastName,
						username,
						admin: false,
						admissions: false
					}
				})
			}))
			return Promise.all([importStudentsPromise, importTeachersPromise])
				.then(() => Promise.resolve(invalidEmails))
		})