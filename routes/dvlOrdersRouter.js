import express from 'express'
import {
  dvlOrdersCont,
  dvlOrdersSearch,
  dvlOrdersSingle,
  fileUpload,
  multiFileUpload,
} from '../controllers/dvlOrdersController.js'
import upload from '../fileHelper.js'

const router = express.Router()

router.post('/dvl/orders', dvlOrdersCont)
router.get('/dvl/orders', dvlOrdersCont)
router.get('/dvl/orders/:id', dvlOrdersSingle)
router.patch('/dvl/orders/:id', dvlOrdersSingle)
router.delete('/dvl/orders/:id', dvlOrdersSingle)
router.get('/dvl/orders/search/:query', dvlOrdersSearch)
router.post('/single', upload.single('image'), fileUpload)
router.post('/multi', upload.array('images'), multiFileUpload)

export default router
