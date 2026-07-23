import { log } from 'console'
import http, { createServer } from 'http'

import fs from 'fs'
console.log(fs)

const app = http.createServer()
const PORT = 5000
app.listen(5000,()=>{
    console.log(`server running on http://localhost:${PORT}`);
    
})