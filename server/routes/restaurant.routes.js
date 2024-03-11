import express from 'express'
import { verifyToken } from './../utils/verifyUser.js'
import { createRestaurants, getMyRestaurant, getRestaurants } from '../controllers/restro.controllers.js'


const router = express.Router()

router.get('/', getRestaurants)
router.post('/create/restaurant', verifyToken, createRestaurants)
router.get('/my-restro/:id', verifyToken, getMyRestaurant)


export default router