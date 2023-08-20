import express from 'express'
import { dvlOrdersCont } from '../controllers/dvlOrdersController.js'

const router = express.Router()

router.post('/dvl/orders', dvlOrdersCont)
router.get('/dvl/orders', dvlOrdersCont)
router.patch('/dvl/orders', dvlOrdersCont)
router.delete('/dvl/orders', dvlOrdersCont)

export default router
