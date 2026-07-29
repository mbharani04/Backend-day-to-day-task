import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { appRouter } from './routes/authRoutes.js'

dotenv.config()
const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())


app.use('/api/user',appRouter)

app.listen(PORT,()=>{

    console.log(`server runnng on http://localhost:${PORT}`);  
})
