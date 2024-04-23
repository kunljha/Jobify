import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import morgan from 'morgan'
import { nanoid } from 'nanoid'

import jobRouter from './routes/JobRouter.js'
import mongoose from 'mongoose'

import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js'
import cookieParser from 'cookie-parser'

import cloudinary from 'cloudinary'

import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRoutes.js'

import { authenticateUser } from './middlewares/authMiddleware.js'

//public
import { dirname } from 'path'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(morgan('dev'))

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, './Public')))

app.get('/', (req, res) => {
  res.send('server started')
})

app.post('/', (req, res) => {
  res.send({ message: 'data received', data: req.body })
})

app.use('/api/v1/jobs', authenticateUser, jobRouter)
app.use('/api/v1/users', authenticateUser, userRouter)
app.use('/api/v1/auth', authRouter)

//at the time of deploy
app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './Public', 'index.html'))
})

app.use('*', (req, res) => {
  res.status(400).json({ message: 'Not Found' })
})

app.use(errorHandlerMiddleware)

try {
  await mongoose.connect(process.env.MONGO_URL)
  app.listen(5100, () => {
    console.log('server started')
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}
