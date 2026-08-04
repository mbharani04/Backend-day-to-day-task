



export const todoadd = async (req,res)=>{
    try {
        

        const {username,useremail,userage} = req.body

        const addingData = await addingData.create({
          
          username:"",
          useremail:"",
          userage:""
           
        
        })
        
         res.status(201).json({
            msg:"added successfully",
            todoadd
         })   

    } catch (error) {
        console.log("error on adding todo", error);
        
    }
    



}