import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { addMenuItems } from '../controllers/menu.controllers.js'

const router = express.Router()

router.post('/add-menu/:id', verifyToken, addMenuItems)

export default router