import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { deleteUser, getUser, updateUser } from '../controllers/user.controllers.js'

const router = express.Router()

router.post('/update/:id', verifyToken, updateUser)
router.get('/:id', verifyToken, getUser)
router.delete('/delete/:id', verifyToken, deleteUser)


export default router