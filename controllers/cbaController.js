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

// GET api/cba/blogs

const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await cbaBlog.find({})
  res.json(blogs)
})

// GET api/cba/blogs/:id

const getSingleBlog = asyncHandler(async (req, res) => {
  const blog = await cbaBlog.findById(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404)
    throw new Error('Blog not found')
  }
})

// PUT api/cba/blogs/update/:id

const updateSingleBlog = asyncHandler(async (req, res) => {
  const { title, category, media, text } = req.body
  const blog = await cbaBlog.findById(req.params.id)
  if (blog) {
    blog.title = title
    blog.category = category
    blog.media = media
    blog.text = text

    const savedBlog = await blog.save()

    res.json(savedBlog)
  } else {
    res.status(404)
    throw new Error('Blog not found')
  }
})

// DELETE api/cba/blogs/:id

const deleteSingleBlog = asyncHandler(async (req, res) => {
  const blog = await cbaBlog.findById(req.params.id)
  if (blog) {
    try {
      await blog.deleteOne()
      res.json({ message: 'Blog removed' })
    } catch (error) {
      res.status(404)
      throw new Error('Blog not found')
    }
  } else {
    res.status(404)
    throw new Error('Blog not found')
  }
})

export {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateSingleBlog,
  deleteSingleBlog,
}
