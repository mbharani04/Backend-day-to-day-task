import { authModel } from "../models/userSchema.js";


export const register = async (req,res)=>{
        
    try {
        const {name,email,password} = req.body

if(!name || !email || !password) 
{
       return res.json(res.json({
       msg:"please fill the form"
    }
       
    ))
}

const checkemail = await authModel.findOne(email)
console.log(checkemail)

if(checkemail){
    return res.status(409).json({
        msg:"already email id is there"
    })
}

const changepassword = await bcrypt.hash(password,10)
console.log(changepassword);

return

        const uservalue = await authModel.create({
            name,
            email,
            password:changepassword
        })

       res.json(uservalue)
        
    } catch (error) {
        console.log('error',error.message);
        
        
    }
        

}

export const login = async(req,res)=>{
try {
    const {email,password} = req.body
    if(!email || !password){
        return res.status(404).json({
            msg:"please fill"
        })
    }
const checkemail = await authModel.findOne({email})
if(!checkemail){
    return res.status(404).json({msg:"unathourised"})
}


const checkpassword = await bcrypt.compare(password,checkemail.password)

if(!checkpassword){
    return res.status(201).json({msg:"not valid password"})
}
} catch (error) {
    
}
}