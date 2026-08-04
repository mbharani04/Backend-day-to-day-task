import mongoose from "mongoose";


const ConnectionDB = async ()=>{
    try {
        
        const db = await mongoose.connect(process.env.MONGODB_URI)
        console.log("mongoose connected");
        
    } catch (error) {

        console.log("mongoose not connected",error)
        
    }
}

export default ConnectionDB