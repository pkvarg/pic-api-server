import asyncHandler from 'express-async-handler'
import Bots from '../models/botsModel.js'

const id = '6415ee5bd692c60b380ef10d'

// api/put/increase

const increaseBots = asyncHandler(async (req, res) => {
  const count = await Bots.findById(id)
  const botsInDb = count.botsCount

  count.botsCount = botsInDb + 1

  const savedBots = await count.save()
  res.json(savedBots.botsCount)
})

// api/bots/counter

const getBots = asyncHandler(async (req, res) => {
  const count = await Bots.findById(id)
  const bots = count.botsCount

  console.log('req', bots)

  // let initialCount = 0
  // let newCount = initialCount + 1
  // initialCount = newCount

  res.json(bots)
})

export { getBots, increaseBots }
