import express from 'express'
import {
  dvlOrdersCont,
  dvlOrdersSearch,
} from '../controllers/dvlOrdersController.js'
import { dvlOrdersSingle } from '../controllers/dvlOrdersController.js'

const router = express.Router()

router.post('/dvl/orders', dvlOrdersCont)
router.get('/dvl/orders', dvlOrdersCont)
router.get('/dvl/orders/:id', dvlOrdersSingle)
router.patch('/dvl/orders/:id', dvlOrdersSingle)
router.delete('/dvl/orders/:id', dvlOrdersSingle)
router.get('/dvl/orders/search/:query', dvlOrdersSearch)

export default router
