import asyncHandler from 'express-async-handler'
import cbaBlog from './../models/cbaBlogModel.js'

// POST api/cba/blog

const createBlog = asyncHandler(async (req, res) => {
  const { title, category, media, text } = req.body

  const newCbaBlog = new cbaBlog({
    title,
    category,
    media,
    text,
  })

  const createdNewCbaBlog = await newCbaBlog.save()
  res.status(201).json(createdNewCbaBlog)
})

export { createBlog }
