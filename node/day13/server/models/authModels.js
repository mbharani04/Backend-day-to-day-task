import mongoose from "mongoose";




const creatingSchema = new mongoose.Schema({
    username: String,
    useremail:String,
    usernumber:Number,
    userlocation:String,
    userpassword:String
})

const authModel = mongoose.model("reglog",creatingSchema)
export default authModel