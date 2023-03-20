import express from 'express'
import {
  getVisitors,
  increaseVisitors,
} from '../controllers/visitorsController.js'

const router = express.Router()

router.put('/pic/increase', increaseVisitors)

router.get('/pic/counter', getVisitors)

router.put('/pic/agree/increase', increaseVisitors)

router.put('/dvl/increase', increaseVisitors)

router.get('/dvl/counter', getVisitors)

router.put('/dvl/agree/increase', increaseVisitors)

router.put('/io/increase', increaseVisitors)

router.get('/io/counter', getVisitors)

router.put('/io/agree/increase', increaseVisitors)

export default router
