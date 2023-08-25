import express from 'express'
import {
  dvlOrdersCont,
  dvlOrdersSearch,
  dvlOrdersSingle,
} from '../controllers/dvlOrdersController.js'
import upload from '../fileHelper.js'

const router = express.Router()

router.post('/dvl/orders', upload.array('images'), dvlOrdersCont)
router.get('/dvl/orders', dvlOrdersCont)
router.get('/dvl/orders/:id', dvlOrdersSingle)
router.patch('/dvl/orders/:id', dvlOrdersSingle)
router.delete('/dvl/orders/:id', dvlOrdersSingle)
router.get('/dvl/orders/search/:query', dvlOrdersSearch)

export default router
