//step1
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './Routes/authRoutes.js'
//step2
dotenv.config()

//step5
const app = express()

app.use(cors())
app.use(express.json())

//step6 
app.use("/api/auth", authRoutes);


//step3
const PORT = process.env.PORT || 3000


//step4
app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`);
    
})




//api-creating http://localhost:5000/api/auth