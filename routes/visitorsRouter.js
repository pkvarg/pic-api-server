import express from 'express'
import {
  getVisitors,
  increaseVisitors,
} from '../controllers/visitorsController.js'

const router = express.Router()

router.put('/pic/increase', increaseVisitors)

router.get('/pic/counter', getVisitors)

export default router
