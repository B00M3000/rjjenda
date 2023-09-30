#!/usr/bin/env node

import http from 'http'
import app from './app'
import {sequelize} from './models'
import fs from 'fs'

const { port } = JSON.parse(fs.readFileSync('../settings.json', 'utf8'))

sequelize.sync()
	.then(() => {
		return Promise.resolve(http.createServer(app))
	})
	.then(server => new Promise<void>((resolve, reject) =>
		server.listen(port, resolve)
			.on('error', reject)
	))
	.then(() => console.log('Listening on port:', port))