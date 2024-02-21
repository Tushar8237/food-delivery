import express from 'express'
import { verifyToken } from './../utils/verifyUser.js'
import { createRestaurants } from '../controllers/restro.controllers.js'


const router = express.Router()

router.post('/create/restaurant', verifyToken, createRestaurants)

export default router