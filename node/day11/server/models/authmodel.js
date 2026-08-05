import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

       username:String,
       useremail:String,
       userage:Number

})

const authmodel = mongoose.model("dbname",userSchema)
export default authmodel