import mongoose from 'mongoose'

const connectionDB = async ()=>{
   try {
     const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`backend to DB connection${conn.connection.host}`);
    
    
   } catch (error) {
    console.log('Error',error.message);
    process.exit(1)
    
   }

}

export default connectionDB
