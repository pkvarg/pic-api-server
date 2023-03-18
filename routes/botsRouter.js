import express from 'express'
import { getBots } from '../controllers/botsController.js'

const router = express.Router()

router.post('/increase', getBots)

router.get('/counter', getBots)

export default router
