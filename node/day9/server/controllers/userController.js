import userModel from "../models/userModel.js"


export const addData=async (req,res)=>{

  try {
             const {name,email,age} = req.body
             const adding = await userModel.create()

        } catch (error) {
            
        }


   
   
}