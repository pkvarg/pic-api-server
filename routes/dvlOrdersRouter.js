import express from 'express'
import {
  dvlOrdersCont,
  dvlOrdersSearch,
  dvlOrdersSingle,
  dvlFiles,
} from '../controllers/dvlOrdersController.js'
import upload from '../fileHelper.js'

const router = express.Router()

router.post('/dvl/orders', upload.array('images'), dvlOrdersCont)
router.get('/dvl/orders', dvlOrdersCont)
router.get('/dvl/orders/:id', dvlOrdersSingle)
router.patch('/dvl/orders/:id', upload.array('images'), dvlOrdersSingle)
router.delete('/dvl/orders/:id', dvlOrdersSingle)
router.patch('/dvl/files/:id', dvlFiles)

router.get('/dvl/orders/search/:query', dvlOrdersSearch)

export default router
