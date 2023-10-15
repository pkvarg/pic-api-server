import express from 'express'
import { sendEmail } from '../controllers/emailController.js'

const router = express.Router()

router.put('/cba-contact', sendEmail)

export default router
