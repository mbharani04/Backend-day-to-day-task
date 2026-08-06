import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import connectionDB from './connectionDB/db.js'
dotenv.config()


const app = express()
app.use(cors())
app.use(express.json())
connectionDB()


// http://localhost:5000/api/auth
app.use("/api/auth",authRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`server is running on localhost:${PORT}`);
    
})

export default app