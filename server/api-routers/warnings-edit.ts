import bodyParser from 'body-parser'
import express from 'express'
import {Warnings, NewWarning} from '../../api'
import {success, error} from '../api-respond'
import {Warning} from '../models'

const router = express.Router()
router.get('/warnings', async (_, res) => {
  try {
    const warnings = await Warning.findAll()
    const response: Warnings = warnings.map(({id, assignmentWeight, color}) => ({id, weight: assignmentWeight, color}))
    success(res, response)
  } catch (err) {
    error(res)(err)
  }
})
const HEX_COLOR = /^#[0-9A-F]{6}$/
router.post('/warning',
	bodyParser.json(),
	(req, res) => {
		const {color, weight} = req.body as NewWarning
		if (!HEX_COLOR.test(color)) return error(res)(new Error('Not a hex color: ' + color))

		Warning.create({
			assignmentWeight: weight,
			color
		})
			.then(() => success(res))
			.catch(error(res))
	}
)
router.delete('/warning/:id', (req, res) => {
	const id = Number(req.params.id)
	Warning.destroy({
		where: {id}
	})
		.then(() => success(res))
		.catch(error(res))
})

export default router