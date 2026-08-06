import express from 'express'
import { loginprocess, registerprocess } from '../controller/authController.js'
import { authMiddleware } from '../middleware/authMiddle.js'

const Route = express.Router()

// http://localhost:5000/api/auth/register
Route.post("/register",registerprocess)

// http://localhost:5000/api/auth/login
Route.post("/login",loginprocess)

// http://localhost:5000/api/auth/dashboard
Route.get("/dashboard",authMiddleware,dashboard)

export default Route
