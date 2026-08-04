import express from 'express'
import { todoadd } from '../controllers/authController.js'

const Route = express.Router()

// http://localhost:5000/api/users/todoadd
Route.post("/todoadd",todoadd)



export default Route