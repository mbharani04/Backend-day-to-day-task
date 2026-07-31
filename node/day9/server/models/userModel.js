import mongoose  from "mongoose"

const userSChema = new mongoose.Schema({


name:{
    type:String,
    required:true,
    trim:true //empty space removing before or after text
},

email:{
    type:String,
    unqiue:true,
    lowercase:true
},

age:{
    type:Number,required:true
},
createdBy:{
    type:string,
    default:"Admin"
}

},{timestamps:ture})

const userModel = mongoose.model("studentData",userSChema)

export default userModel