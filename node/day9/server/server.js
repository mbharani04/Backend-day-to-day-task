import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './config/db.js'
import userRoute from './routes/userRoutes.js'
dotenv.config()

connectDb()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/users',userRoute)
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
    
})

