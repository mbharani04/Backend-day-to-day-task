import express from 'express'
import { gettingdata, todoadd } from '../controllers/authController.js'

const Route = express.Router()

// http://localhost:5000/api/users/todoadd 
//  -post -{username:String,
//    useremail:String,
//    userage:Number}

Route.post("/todoadd",todoadd)

// http://localhost:5000/api/users/gettingdata  -- get all the datas from db 
Route.get("/gettingdata",gettingdata)

export default Route 