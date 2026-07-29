import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import ConnectDB from './controller/db.js'

dotenv.config()
ConnectDB()

const app =express()
const PORT =  process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.listen(PORT,()=>{

    console.log(`server runnng on http://localhost:${PORT}`);  
})