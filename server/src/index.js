import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import itemRouter from './routes/router.js'

dotenv.config()

const port = process.env.PORT || 3000
const app = express()

app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
		methods: ['GET', 'POST', 'DELETE', 'PATCH'],
		allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
	})
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/items', itemRouter)

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('Подключены к БД')
		app.listen(port, () => {
			console.log(`Сервер запущен на порту: ${port}`)
		})
	})
	.catch(err => {
		console.log('Ошибка во время подключения к БД: ', err.message)
	})
