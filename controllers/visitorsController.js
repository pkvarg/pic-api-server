import asyncHandler from 'express-async-handler'
import Visitors from '../models/visitorsModel.js'

const id = '641729fdfa5467afe11ddc0d'

// PUT api/visitors/pic/increase

const increaseVisitors = asyncHandler(async (req, res) => {
  const count = await Visitors.findById(id)
  const visitorsInDb = count.visitorsCount

  count.visitorsCount = visitorsInDb + 1

  const savedVisitors = await count.save()
  res.json(savedVisitors.visitorsCount)
})

// GET api/visitors/pic/counter

const getVisitors = asyncHandler(async (req, res) => {
  const count = await Visitors.findById(id)
  const visitors = count.visitorsCount

  res.json(visitors)
})

export { getVisitors, increaseVisitors }
