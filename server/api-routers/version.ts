import * as express from 'express'
import {VersionInfo} from '../../api'
import {success} from '../api-respond'

const router = express.Router()
router.get('/', (_, res) => {
	const response: VersionInfo = {
		app: process.env.npm_package_version!,
		node: process.versions.node,
		sequelize: require('sequelize').version,
		typescript: require('typescript').version
	}
	success(res, response)
})

export default router