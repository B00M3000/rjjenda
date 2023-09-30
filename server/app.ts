import express from 'express'
import session from 'express-session'
import connectSessionSequelize = require('connect-session-sequelize')
import path from 'path'
import apiRouter from './api-routers/api'
import passport from './authentication'
import {sequelize} from './models'
import fs from 'fs'

const { CLIENT_SECRET } = process.env

const SequelizeStore = connectSessionSequelize(session.Store)
const app = express()

app.use(session({
	secret: CLIENT_SECRET,
	resave: false,
	saveUninitialized: false,
	store: new SequelizeStore({db: sequelize})
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(apiRouter)
app.use(express.static(path.join(__dirname, '../public')))
app.use((_, res) =>
	res.sendFile(path.join(__dirname, '../public/index.html'))
)

export default app