import express from 'express'
import { message } from '../controllers/jbController.js'

const router = express.Router()

router.put('/whatssapp', message)

export default router
