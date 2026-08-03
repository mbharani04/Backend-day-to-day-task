import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import connectionDB from './config/db.js'


dotenv.config()
connectionDB()
const app = express()
app.use(cors())

app.use(express.json())

//http://localhost:5000/api/users
app.use("/api/users",authRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT ,()=>{
    console.log(`server running on http://localhost:${PORT}`);
    
})