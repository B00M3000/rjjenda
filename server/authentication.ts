import passport from 'passport'
import {OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth'
import {StudentInstance} from './models/student'
import {TeacherInstance} from './models/teacher'
import {Student, Teacher} from './models'

import dotenv from 'dotenv'
dotenv.config()

const { HOST_DOMAIN, PORT, EMAIL_DOMAIN, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

export type UserType = StudentInstance | TeacherInstance
export class SavedUserType {
	readonly id: string
	readonly type: 'student' | 'teacher'

	constructor(id: string) {
		this.id = id
		if (this.id.startsWith('S')) this.type = 'student'
		else this.type = 'teacher'
	}
}
passport.serializeUser<UserType, SavedUserType>((user, done) => {
	done(null, new SavedUserType(user.id))
})
passport.deserializeUser<UserType, SavedUserType>(({id, type}, done) => {
	if (type === 'student') {
		Student.findOne({
			attributes: ['id'],
			where: {id}
		})
			.then(student => {
				if (student) done(null, student)
				else done(new Error('No such student: ' + id))
			})
	}
	else {
		Teacher.findOne({
			attributes: ['id'],
			where: {id}
		})
			.then(teacher => {
				if (teacher) done(null, teacher)
				else done(new Error('No such teacher: ' + id))
			})
	}
})

export function lookupUsername(username: string, done: (err: Error | null, user?: UserType) => void): void {
	Student.findOne({
		attributes: ['id'],
		where: {username}
	})
		.then(student => {
			if (student) done(null, student)
			else {
				Teacher.findOne({
					attributes: ['id'],
					where: {username}
				})
					.then(teacher => {
						if (teacher) done(null, teacher)
						else done(new Error('Unable to find user with username: ' + username))
					})
			}
		})
}
passport.use(new GoogleStrategy({
	clientID: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	callbackURL: `https://${HOST_DOMAIN}:${PORT}/auth/callback`
}, (_, __, profile, done) => {
	if (!profile.emails) {
		done(new Error('No emails'))
		return
	}
	for (const email of profile.emails) {
		const {value} = email
		const [username, domain] = value.split('@')
		if (domain === EMAIL_DOMAIN) {
			lookupUsername(username, done)
			return
		}
	}
	done(null)
}))

export default passport