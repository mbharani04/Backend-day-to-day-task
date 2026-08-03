
import express from 'express'
import { posting, register, studget, studpost } from "../controller/authController.js";
// post an data 
//http://localhost:5000/api/auth/register



//step1 create router and put condition in authcontroller and come back call here

const route = express.Router()

route.get("/register",register);

//http://localhost:5000/api/auth/posting
route.post("/posting",posting)

//http://localhost:5000/api/auth/studget
route.get("/studget",studget)

//http://localhost:5000/api/auth/studpost
route.post("/studpost",studpost)


export default route



