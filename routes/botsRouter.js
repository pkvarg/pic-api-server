import express from 'express'
import { getBots, increaseBots } from '../controllers/botsController.js'

const router = express.Router()

router.post('/increase', increaseBots)

router.get('/counter', getBots)

export default router
