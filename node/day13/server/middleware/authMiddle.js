



export const authMiddleware = (req,res,next)=>{

     try {
        const authHeaders = req.headers.authorization 
        
    console.log('authHeaders',authHeaders);
       if(!authHeaders) {
           
           return res.status(401).json({msg:"Authorization header is missing"})

       }

    const token = authHeaders.split(" ")[1]
    
    if(!token) {
        return res.status(401).json({msg:"token missing"})
    }
    const decoded = jwt.verify(token,process.env.REFRESH_TOKEN_SECRET) 
     req.user = decoded

     next()     
    } catch (error) {
        res.status(500).json({msg:"error",error})
        
    }

}