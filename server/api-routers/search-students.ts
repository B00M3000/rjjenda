import bodyParser from 'body-parser'
import express from 'express'
import Sequelize from 'sequelize'
import {MatchingStudent, StudentQuery} from '../../api'
import {success, error} from '../api-respond'
import {restrictToTeacher} from '../api-restrict'
import {toGroupStudents} from './groups-edit'
import {Student} from '../models'
import {StudentAttributes} from '../models/student'

const FULL_NAME = Sequelize.fn('lower',
	Sequelize.fn('concat', Sequelize.col('firstName'), ' ', Sequelize.col('lastName'))
)

const router = express.Router()
router.post('/',
	restrictToTeacher,
	bodyParser.json(),
	(req, res) => {
		const {nameSearch} = req.body as StudentQuery
		Student.findAll({
			attributes: ['id', 'firstName', 'lastName'],
			where: Sequelize.where(
				Sequelize.fn('strpos', FULL_NAME, nameSearch.toLowerCase()),
				{[Sequelize.Op.ne]: 0}
			) as Sequelize.WhereOptions<StudentAttributes>
		})
			.then(toGroupStudents)
			.then((response: MatchingStudent[]) => success(res, response))
			.catch(error(res))
	}
)

export default router