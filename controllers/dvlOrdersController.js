import asyncHandler from 'express-async-handler'
import dvlOrders from '../models/dvlAdminModel.js'
import dvlSingleFileUpload from '../models/dvlSingleFileUpload.js'

const dvlOrdersCont = asyncHandler(async (req, res) => {
  console.log('hello Admin', req.method)

  if (req.method === 'POST') {
    const { title, name, address, phone, price, date, description } = req.body
    const files = []
    if (req.files) {
      req.files.forEach((element) => {
        const file = {
          fileName: element.originalname,
          fileType: element.mimetype,
          filePath: element.path,
          fileSize: getSizeFile(element.size, 2),
        }
        files.push(file)
      })
    }

    const orderData = {
      title,
      name,
      address,
      phone,
      price: price !== 'undefined' ? price : '?',
      date,
      description,
      files,
    }
    console.log(orderData)

    const order = new dvlOrders(orderData)
    await order.save()
    res.status(201).json('OK')
  }
  if (req.method === 'GET') {
    const orders = await dvlOrders.find({}).sort({ date: -1 })
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
    const { address, description, name, phone, title, date, price } = req.body
    order.address = address
    order.description = description
    order.name = name
    order.phone = phone
    order.title = title
    order.date = date
    order.price = price
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
        { date: { $regex: query, $options: 'i' } },
        { price: { $regex: query, $options: 'i' } },
      ],
    })

    res.json(results)
  } catch (error) {
    console.error('Error searching in MongoDB:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

const getSizeFile = (bytes, decimals) => {
  if (decimals === 0) return '0 Bytes'
  const dm = decimals || 2
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB']
  const index = Math.floor(Math.log(bytes) / Math.log(1000))
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + '-' + sizes[index]
  )
}

export { dvlOrdersCont, dvlOrdersSingle, dvlOrdersSearch }
