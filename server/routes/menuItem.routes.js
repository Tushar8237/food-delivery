import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { addMenuItems, searchItems } from '../controllers/menu.controllers.js'

const router = express.Router()

router.post('/add-menu/:id', verifyToken, addMenuItems)
router.get('/search', searchItems)

export default router