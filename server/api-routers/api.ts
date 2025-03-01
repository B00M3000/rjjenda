import express from 'express'
import adminRouter from './admin'
import assignmentsRouter from './assignments'
import advisorRouter from './advisor'
import authenticationRouter from './authentication'
import eventsRouter from './events'
import isRouter from './is'
import listTeachersRouter from './list-teachers'
import loggedInRouter from './logged-in'
import logoutRouter from './logout'
import searchStudentsRouter from './search-students'
import userInfoRouter from './user-info'
import versionRouter from './version'

const router = express.Router()
router.use('/admin', adminRouter)
router.use('/assignments', assignmentsRouter)
router.use('/advisor', advisorRouter)
router.use('/auth', authenticationRouter)
router.use('/events', eventsRouter)
router.use('/is', isRouter)
router.use('/logged-in', loggedInRouter)
router.use('/logout', logoutRouter)
router.use('/search-students', searchStudentsRouter)
router.use('/user-info', userInfoRouter)
router.use('/version', versionRouter)
router.use('/list-teachers', listTeachersRouter)

export default router