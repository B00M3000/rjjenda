import express from 'express'
import {success, error} from '../api-respond'
import {lookupUsername} from '../authentication'

const router = express.Router()
router.get('/view-as/:username', (req, res) => {
	lookupUsername(req.params.username as string, (err, user) => {
		if (err) return error(res)(new Error('Username not found'))

		req.login(user, err => {
			if (err) error(res)(err)
			else success(res)
		})
	})
})

export default router