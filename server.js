import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import colors from 'colors'
import botsRouter from './routes/botsRouter.js'

dotenv.config()
//connectDB()

const app = express()

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://pictusweb.sk',
    ],
  })
)

app.use('/api/bots', botsRouter)

const PORT = 2000

const startServer = async () => {
  connectDB()
  try {
    app.listen(PORT, () =>
      console.log(`pic-server running on port ${PORT}`.yellow.bold)
    )
  } catch (error) {
    console.log(error)
  }
}

startServer()

// app.listen(PORT, console.log(`pic-server running on port ${PORT}`.yellow.bold))
