import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import colors from 'colors'
import botsRouter from './routes/botsRouter.js'
import visitorsRouter from './routes/visitorsRouter.js'
import emailRouter from './routes/emailRouter.js'
import path from 'path'
dotenv.config()
//connectDB()

const app = express()

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://cba.pictusweb.sk',
      'https://pictusweb.sk',
      'https://cestazivota.sk',
      'https://ioana-illustrations.eu',
      'https://ecommerce.pictusweb.sk',
      'https://katolickaviera.sk',
      'https://svedkovia.sk',
      'https://duhovyrod.sk',
    ],
  })
)

app.use(express.json())
app.use('/uploads', express.static(path.resolve('uploads')))

app.use('/api/bots', botsRouter)
app.use('/api/visitors', visitorsRouter)
app.use('/api/email', emailRouter)
app.get('/', (req, res) => {
  res.send('Hello pic-api!')
})

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
