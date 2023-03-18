// import asyncHandler from 'express-async-handler'

const getBots = (req, res) => {
  let initialCount = 0
  let newCount = initialCount + 1
  initialCount = newCount
  console.log(newCount)
  res.json(newCount)
}

export { getBots }
