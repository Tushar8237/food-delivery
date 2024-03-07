import express from 'express'
import { verifyToken } from './../utils/verifyUser.js'
import { deleteAddress, getAllAddresses, saveAddress } from '../controllers/address.controllers.js'

const router = express.Router()

router.post('/save-address', verifyToken, saveAddress)
router.get('/all-address', verifyToken, getAllAddresses)
router.delete('/delete-address/:id', verifyToken, deleteAddress)

export default router