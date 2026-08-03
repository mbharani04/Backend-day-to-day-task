
import express from 'express'
import { posting, register } from "../controller/authController.js";
// post an data 
//http://localhost:5000/api/auth/register



//step1 create router and put condition in authcontroller and come back call here

const route = express.Router()

route.get("/register",register);

//http://localhost:5000/api/auth/posting
route.post("/posting",posting)
export default route