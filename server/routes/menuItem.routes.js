import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { addMenuItems, deleteMenuItem, getRestaurantMenu, searchItems, updateMenuItem } from '../controllers/menu.controllers.js'

const router = express.Router()

router.post('/add-menu/:id', verifyToken, addMenuItems)
router.get('/search', searchItems)
router.delete('/:res/:id', verifyToken,  deleteMenuItem)
router.put('/:res/:id', verifyToken,  updateMenuItem)
router.get('/menu/:id', verifyToken,  getRestaurantMenu)




export default router