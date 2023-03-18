// import asyncHandler from 'express-async-handler'
let clicks = 0

// api/post/increase

const increaseBots = (req, res) => {
  clicks += 1
  res.json(clicks)
}

// api/bots/counter

const getBots = (req, res) => {
  console.log('req', req.body)

  // let initialCount = 0
  // let newCount = initialCount + 1
  // initialCount = newCount

  res.json(clicks)
}

export { getBots, increaseBots }
