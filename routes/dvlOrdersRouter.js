import express from 'express'
import { dvlOrdersCont } from '../controllers/dvlOrdersController.js'
import { dvlOrdersSingle } from '../controllers/dvlOrdersController.js'

const router = express.Router()

router.post('/dvl/orders', dvlOrdersCont)
router.get('/dvl/orders', dvlOrdersCont)
router.get('/dvl/orders/:id', dvlOrdersSingle)
router.patch('/dvl/orders/:id', dvlOrdersSingle)
router.delete('/dvl/orders/:id', dvlOrdersSingle)

export default router
