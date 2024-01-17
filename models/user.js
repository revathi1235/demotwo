const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:"user"
    }
})
const userModel=mongoose.model('reg',userSchema)
module.exports=userModel