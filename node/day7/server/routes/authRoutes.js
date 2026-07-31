import express from 'express'
import { adminlogin, getdata, getstudent, productquery, profileauth, register, userprofile } from '../controller/authController.js'


const appRouter = express.Router()


//http://localhost:5000/api/user/getdata
appRouter.get("/getdata",getdata)

//http://localhost:5000/api/user/getstudent
appRouter.get("/getstudent",getstudent)

//http://localhost:5000/api/user/register
appRouter.post("/register",register)

//http://localhost:5000/api/user/userprofile/101
appRouter.get("/userprofile/:id",userprofile)

//http://localhost:5000/api/user/productquery
appRouter.get("/productquery",productquery)

//http://localhost:5000/api/user/profileauth
appRouter.get("/profileauth",profileauth)

//http://localhost:5000/api/user/adminlogin
appRouter.post("/adminlogin",adminlogin)

//http://localhost:5000/api/user/studentdetails
appRouter.post("/studentdetails",studentdetails)


export default appRouter

