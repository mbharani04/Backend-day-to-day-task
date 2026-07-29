import mongoose from "mongoose"

const ConnectDB = async ()=>{

    try{
        const db = await mongoose.connect (process.env.MONGODB_URI)
        console.log(`database connection sucessfully ${db.connection.host}`);
        
    }
    catch{
        console.log(`database connection failed`,error.message);
        process.exit(1)

    }
}
export default ConnectDB