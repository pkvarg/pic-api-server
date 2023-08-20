import asyncHandler from 'express-async-handler'
import dvlOrders from '../models/dvlAdminModel.js'

const dvlOrdersCont = asyncHandler(async (req, res) => {
  console.log('hello Admin', req.method)

  if (req.method === 'POST') {
    const orderData = req.body
    const order = new dvlOrders(orderData)
    await order.save()

    res.status(201).json('order created')
  } else if (req.method === 'GET') {
    console.log('GET')
  } else if (req.method === 'PATCH') {
    console.log('PATCH')
  } else if (req.method === 'DELETE') {
    console.log('DELETE')
  }
})

export { dvlOrdersCont }
