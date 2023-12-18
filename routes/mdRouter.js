import express from 'express'
import {
  contactEmail,
  sendEmail,
  getAttachmentsCount,
  saveDownloadsEmail,
} from '../controllers/mdController.js'

const router = express.Router()

router.put('/email', sendEmail)

router.put('/contact', contactEmail)

router.get('/sentEmailsCount', getAttachmentsCount)

router.put('/downloadsEmails', saveDownloadsEmail)

export default router
