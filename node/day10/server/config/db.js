import mongoose from 'mongoose'

const connectionDB = async()=>{

    try {

        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`mongoose connected${conn.connection.host}`);
        

    } catch (error) {
        console.log('error', error.message);
        
        
    }
}
export default connectionDB