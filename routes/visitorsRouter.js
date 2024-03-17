import express from 'express'
import {
  getVisitors,
  increaseVisitors,
} from '../controllers/visitorsController.js'

const router = express.Router()

router.put('/pic/increase', increaseVisitors)

router.get('/pic/counter', getVisitors)

router.put('/pic/agree/increase', increaseVisitors)

router.put('/cesta/increase', increaseVisitors)

router.get('/cesta/counter', getVisitors)

router.put('/katolicka/increase', increaseVisitors)

router.get('/katolicka/counter', getVisitors)

router.put('/svedkovia/increase', increaseVisitors)

router.get('/svedkovia/counter', getVisitors)

router.put('/gender/increase', increaseVisitors)

router.get('/gender/counter', getVisitors)

router.get('/md/counter', getVisitors)

router.put('/md/increase', increaseVisitors)

router.put('/io/increase', increaseVisitors)

router.get('/io/counter', getVisitors)

router.put('/io/agree/increase', increaseVisitors)

export default router
