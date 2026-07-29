

// export const register = async (req,res)=>{

//     console.log(res)

// }'

import express from 'express'
import registerUser from '../controller/authController.js'

export const appRouter = express.Router()

//http://localhost:5000/api/user/register

appRouter.post('/register',registerUser)
