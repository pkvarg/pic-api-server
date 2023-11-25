import express from 'express'
import { contactEmail, sendEmail } from '../controllers/mdController.js'

const router = express.Router()

router.put('/email', sendEmail)

router.put('/contact', contactEmail)

export default router
