


export const getdata = async(req,res)=>{


console.log(req.body);
return res.status(201).json({message:"Welcome to Express.js"})
}

const arraystore = [{
  "id": 101,
  "name": "Sudhan",
  "course": "MERN Stack"
}]

export const getstudent = async (req,res)=>{
    console.log(req.body);


    return res.status(201).json({ arraystore })
}
export const register = async (req,res)=>{

    const  {name , email} = req.body

    return res.status(201).json({
        sucess:true,
        message: "sucessfully post/ add",
        student:{
            name, 
            email
        }
    })
}


export const userprofile = async(req,res)=>{

    const profileid = req.params.id
    return res.status(201).json({profileid})
}

export const productquery = async(req,res)=>{

    const query = req.query
     return res.status(201).json({query})
        
        

}

export const profileauth = async (req,res)=>{

const authorization = req.headers

return res.status(201).json({ authorization})
}

export const adminlogin = async (req,res) =>{

    console.log(req);
    
   const {email,password} = req.body
   return res.status(201).json({
    message: "Login Successful",
    email,
    password

   })
    
}
 
export const studentdetails = async (req,res) =>{
    

}