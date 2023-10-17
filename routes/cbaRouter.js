import express from 'express'
import { createBlog } from '../controllers/cbaController.js'

const router = express.Router()

router.post('/blog', createBlog)

export default router
