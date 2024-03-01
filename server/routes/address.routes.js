import express from 'express'
import { verifyToken } from './../utils/verifyUser.js'
import { deleteAddress, getAllAddresses, saveAddress } from '../controllers/address.controllers.js'

const router = express.Router()

router.post('/address', verifyToken, saveAddress)
router.get('/address', verifyToken, getAllAddresses)
router.delete('/:id', verifyToken, deleteAddress)



export default router