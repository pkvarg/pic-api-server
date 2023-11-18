import express from 'express'
import { sendEmail } from '../controllers/mdController.js'

const router = express.Router()

router.put('/email', sendEmail)

export default router
