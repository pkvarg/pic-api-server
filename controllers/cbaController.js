import asyncHandler from 'express-async-handler'
import cbaBlog from './../models/cbaBlogModel.js'
import cbaUser from '../models/cbaUserModel.js'

// POST api/cba/newuser

const createNewUser = asyncHandler(async (req, res) => {
  const { emailToDb } = req.body
  try {
    const userExists = await cbaUser.findOne({
      email: emailToDb,
    })

    if (userExists) {
      return res.status(200).send(`Užívateľ s emailom ${emailToDb} už existuje`)
    } else {
      const user = new cbaUser({
        name: 'new user',
        email: emailToDb,
        hashedPassword: '123',
        isAdmin: false,
      })
      const createdUser = await user.save()
      res.status(201).json(createdUser)
    }
  } catch (error) {
    console.log(error)
    res.json('error creating user', error)
  }
})

// GET api/cba/getUserById/:id

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const user = await cbaUser.findById({ _id: id })
    if (user) {
      console.log(user)
      res.json(user)
    }
  } catch (error) {
    console.log(error)
  }
})

// PUT api/cba/edituser/:id

const edituser = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { name, email, isAdmin } = req.body

  try {
    const user = await cbaUser.findById({ _id: id })
    if (user) {
      user.name = name
      user.email = email
      user.isAdmin = isAdmin
    }

    const savedUser = await user.save()
    res.json(savedUser)
  } catch (error) {
    console.log(error)
  }
})

// DEL api/cba/deleteuser/:id

const deleteuser = asyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    const user = await cbaUser.deleteOne({ _id: id })

    res.json('Užívateľ vymazaný')
  } catch (error) {
    console.log(error)
  }
})

// GET api/cba/getall
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await cbaUser.find({})
  if (users) {
    res.json(users)
  }
})

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
    blog.media = media || ''
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

// GET api/cba/blogs/category/:category

const getBlogsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params
  const blogs = await cbaBlog.find({ category: category })
  if (blogs) {
    res.json(blogs)
  } else {
    res.status(404)
    throw new Error(`No blogs in category ${category} were found`)
  }
})

export {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateSingleBlog,
  deleteSingleBlog,
  getBlogsByCategory,
  createNewUser,
  getAllUsers,
  getUserById,
  edituser,
  deleteuser,
}
