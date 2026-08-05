import authmodel from "../models/authmodel.js"

export const todoadd = async (req,res)=>{
    try {
        
        const {username,useremail,userage} = req.body

        if(!username || !useremail || !userage){
            return res.status(409).json({
                msg:"please fill"
            })
        }

        const checkEmail = await authmodel.findOne({useremail})
        if(checkEmail){
            return res.status(401).json({msg:"already exists"})
        }

        const create = await authmodel.create({username,useremail,userage})
         return res.status(201).json({
            msg:"sucessfully done",
            create

         })
        

    }
   
    catch (error) {
        console.log("error on adding todo", error);
        
    }
}

export const gettingdata = async(_,res)=>{
try {

    const getting = await authmodel.find()
    res.status(200).json({mydata:getting})
    
} catch (error) {
    res.status(500).json(
        {backend:"something error in backend", error}
     )
}
}