
import express from 'express'

// post an data 
//http://localhost:5000/api/auth/register

import { register } from "./controller/authController.js";

//step1 create router and put condition in authcontroller and come back call here

const route = express.Router()

route.post("/register",register);

export default route