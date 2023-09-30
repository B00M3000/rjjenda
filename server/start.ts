#!/usr/bin/env node

import * as http from 'http'
import app from './app'
import {sequelize} from './models'
import {port} from '../settings.json'

sequelize.sync()
	.then(() => {
		return Promise.resolve(http.createServer(app))
	})
	.then(server => new Promise<void>((resolve, reject) =>
		server.listen(port, resolve)
			.on('error', reject)
	))
	.then(() => console.log('Listening on port:', port))