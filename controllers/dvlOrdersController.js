import asyncHandler from 'express-async-handler'
import dvlOrders from '../models/dvlAdminModel.js'

const dvlOrdersCont = asyncHandler(async (req, res) => {
  console.log('hello Admin', req.method)

  if (req.method === 'POST') {
    const orderData = req.body
    const order = new dvlOrders(orderData)
    await order.save()
    res.status(201).json('OK')
  } else if (req.method === 'GET') {
    const orders = await dvlOrders.find({})
    res.status(200).json(orders)
  }
})

const dvlOrdersSingle = asyncHandler(async (req, res) => {
  const id = req.params.id
  if (req.method === 'GET') {
    const order = await dvlOrders.findById(id)
    res.status(200).json(order)
  } else if (req.method === 'PATCH') {
    const order = await dvlOrders.findById(id)
    const { address, description, name, phone, title } = req.body
    order.address = address
    order.description = description
    order.name = name
    order.phone = phone
    order.title = title
    const savedOrder = await order.save()
    res.status(200).json(savedOrder)
  } else if (req.method === 'DELETE') {
    const order = await dvlOrders.deleteOne({ _id: id })
    res.status(200).json('OK')
  }
})

export { dvlOrdersCont, dvlOrdersSingle }
