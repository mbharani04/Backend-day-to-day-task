import express from 'express'
import { addData } from '../controllers/userController.js'
const userRoute = express.Router()


//http://localhost:5000/api/users/register
userRoute.post("/register",addData)
export default userRoute