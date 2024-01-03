import express from 'express'
import {
  contactEmail,
  sendEmail,
  sendEmailHouse,
  getAttachmentsCount,
  saveDownloadsEmail,
  getEmails,
} from '../controllers/mdController.js'

const router = express.Router()

router.put('/email', sendEmail)

router.put('/email-house', sendEmailHouse)

router.put('/contact', contactEmail)

router.get('/sentEmailsCount', getAttachmentsCount)

router.put('/downloadsEmails', saveDownloadsEmail)

router.get('/emails', getEmails)

export default router
