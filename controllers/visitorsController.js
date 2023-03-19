import asyncHandler from 'express-async-handler'
import Visitors from '../models/visitorsModel.js'

const id = '641729fdfa5467afe11ddc0d'

// PUT api/visitors/pic/increase

const increaseVisitors = asyncHandler(async (req, res) => {
  console.log(req.url)
  let url = req.url
  const count = await Visitors.findById(id)
  if (url === '/pic/increase') {
    const visitorsDeclinedInDb = count.visitorsDeclined
    count.visitorsDeclined = visitorsDeclinedInDb + 1
  } else if ((url = '/pic/agree/increase')) {
    const visitorsAgreedInDb = count.visitorsAgreed
    count.visitorsAgreed = visitorsAgreedInDb + 1
  } else {
    console.log('unknown url')
  }

  const savedVisitors = await count.save()
  res.json(savedVisitors)
})

// GET api/visitors/pic/counter (both agreed and declined)

const getVisitors = asyncHandler(async (req, res) => {
  const count = await Visitors.findById(id)
  const visitorsDeclined = count.visitorsDeclined
  const visitorsAgreed = count.visitorsAgreed

  res.json({
    agreed: visitorsAgreed,
    declined: visitorsDeclined,
  })
})

export { getVisitors, increaseVisitors }
