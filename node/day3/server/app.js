//console.log(process.cwd())

import http from 'http'
import dotenv from 'dotenv'
import os from 'os'

dotenv.config()

const app = http.createServer()
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{

    console.log(`server running on http://localhost:${PORT}`);
    
})

console.log(os.hostname());

console.log(os.platform());


