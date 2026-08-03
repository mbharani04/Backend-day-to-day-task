import express from 'express'

import { login, register } from "../controllers/authController.js";


const authRoutes = express.Router()



//http://localhost:5000/api/users/register
authRoutes.post("/register", register)

//http://localhost:5000/api/users/login
authRoutes.post("/login", login)

export default authRoutes