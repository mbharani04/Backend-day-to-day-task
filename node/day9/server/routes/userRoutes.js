import express from 'express'
import { addData } from '../controllers/userController.js'
const userRoute = express.Router()

userRoute.post("/register",addData)
export default userRoute