#!/usr/bin/env node

import http from 'http'
import app from './app'
import {sequelize} from './models'

import dotenv from 'dotenv'
dotenv.config()

sequelize.sync()
	.then(() => {
		return Promise.resolve(http.createServer(app))
	})
	.then(server => new Promise<void>((resolve, reject) =>
		server.listen(PORT, resolve)
			.on('error', reject)
	))
	.then(() => console.log('Listening on port:', PORT))