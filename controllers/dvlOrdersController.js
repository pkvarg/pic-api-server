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

const dvlOrdersSearch = asyncHandler(async (req, res) => {
  const query = req.params.query
  console.log('query', query)

  try {
    const results = await dvlOrders.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, // 'i' for case-insensitive
        { title: { $regex: query, $options: 'i' } },
        { address: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    })

    res.json(results)
  } catch (error) {
    console.error('Error searching in MongoDB:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export { dvlOrdersCont, dvlOrdersSingle, dvlOrdersSearch }
