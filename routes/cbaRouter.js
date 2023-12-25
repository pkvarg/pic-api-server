import express from 'express'
import {
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
} from '../controllers/cbaController.js'

const router = express.Router()

router.post('/blog', createBlog)
router.get('/blogs', getAllBlogs)
router.get('/blogs/:id', getSingleBlog)
router.put('/blogs/update/:id', updateSingleBlog)
router.delete('/blogs/:id', deleteSingleBlog)
router.get('/blogs/category/:category', getBlogsByCategory)
router.post('/newuser', createNewUser)
router.get('/getall', getAllUsers)
router.get('/getUserById/:id', getUserById)
router.put('/edituser/:id', edituser)
router.delete('/deleteuser/:id', deleteuser)

export default router
