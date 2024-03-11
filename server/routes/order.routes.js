import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { createOrder } from '../controllers/order.controllers.js'

const router = express.Router()

router.post('/create-order', verifyToken, createOrder)


export default router