import express from 'express'
import { getBots, increaseBots } from '../controllers/botsController.js'

const router = express.Router()

router.put('/increase', increaseBots)

router.get('/counter', getBots)

// router.put('/dvl/increase', increaseBots)

// router.get('/dvl/counter', getBots)

router.put('/io/increase', increaseBots)

router.get('/io/counter', getBots)

export default router
