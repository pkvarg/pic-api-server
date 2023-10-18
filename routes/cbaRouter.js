import express from 'express'
import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateSingleBlog,
  deleteSingleBlog,
  getBlogsByCategory,
} from '../controllers/cbaController.js'

const router = express.Router()

router.post('/blog', createBlog)
router.get('/blogs', getAllBlogs)
router.get('/blogs/:id', getSingleBlog)
router.put('/blogs/update/:id', updateSingleBlog)
router.delete('/blogs/:id', deleteSingleBlog)
router.get('/blogs/category/:category', getBlogsByCategory)

export default router
