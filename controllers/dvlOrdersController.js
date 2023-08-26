import asyncHandler from 'express-async-handler'
import dvlOrders from '../models/dvlAdminModel.js'
import fs from 'fs'

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
      price: price !== 'undefined' ? price : 'null',
      date: date !== 'undefined' ? date : null,
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
    let files = []
    if (req.files) {
      if (order.files.length > 0) {
        files = order.files
        req.files.forEach((element) => {
          const file = {
            fileName: element.originalname,
            fileType: element.mimetype,
            filePath: element.path,
            fileSize: getSizeFile(element.size, 2),
          }
          files.push(file)
        })
      } else {
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
    }
    order.address = address
    order.description = description
    order.name = name
    order.phone = phone
    order.title = title
    order.date = date
    order.price = price
    order.files = files
    const savedOrder = await order.save()
    res.status(200).json(savedOrder)
  } else if (req.method === 'DELETE') {
    const order = await dvlOrders.deleteOne({ _id: id })
    res.status(200).json('OK')
  }
})

const dvlFiles = asyncHandler(async (req, res) => {
  const id = req.params.id
  const { index } = req.body
  if (req.method === 'PATCH') {
    const order = await dvlOrders.findById({ _id: id })
    order.files.splice(index, 1)
    order.save()
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

const dvlOrdersFileOnServer = asyncHandler(async (req, res) => {
  const fileName = req.params.name
  console.log(fileName)
  const filePath = `./uploads/${fileName}` // Adjust the path accordingly

  if (req.method === 'DELETE') {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err)
        res
          .status(500)
          .json({ error: 'Nemožno vymazať súbor - asi už neexistuje.' })
      } else {
        res.status(200).json('OK')
      }
    })
  } else if (req.method === 'GET') {
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).send('Súbor nenájdený')
    }
    const fileStream = fs.createReadStream(filePath)
    // Handle errors during file stream creation
    fileStream.on('error', (error) => {
      console.error(`Error creating file stream: ${error}`)
      res.status(500).send('Internal Server Error')
    })
    fileStream.pipe(res)
    // Handle errors during response piping
    res.on('error', (error) => {
      console.error(`Error piping response: ${error}`)
      res.status(500).send('Internal Server Error')
    })

    // Close the response when the file stream ends
    fileStream.on('end', () => {
      res.end()
    })
  }

  // Use the fs.unlink method to delete the file
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

export {
  dvlOrdersCont,
  dvlOrdersSingle,
  dvlOrdersSearch,
  dvlFiles,
  dvlOrdersFileOnServer,
}
