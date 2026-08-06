import express from 'express'
import { loginprocess, registerprocess } from '../controller/authController.js'






const Route = express.Router()


// http://localhost:5000/api/auth/register
Route.post("/register",registerprocess)

// http://localhost:5000/api/auth/login
Route.post("/login",loginprocess)

export default Route
