const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const cookieparser=require("cookie-parser")
const userModel=require('./models/user')

const app=express()
app.use(express.json())
app.use(cors())
app.use(cookieparser())


mongoose.connect("mongodb://127.0.0.1:27017/dummy")

app.get('/',(req,res)=>{
    res.send("hello")
})

app.post('/register', (req,res)=>{
    const {name,email,password}=req.body
    bcrypt.hash(password,10)
    .then((hash)=>{userModel.create({name,email,password:hash})
    .then((user)=>{
        res.json(user)
    }).catch((err)=>res.json(err))

    })
})

app.post('/login', async(req,res) => {
    const {email , password}=req.body;
    try{
    const user=await userModel.findOne({email})
    if(user && bcrypt.compareSync(password,user.password )){
    const token=jwt.sign({
        userid:user._id,email:user.email,role:user.role
    },"your_secret_key",{expiresIn:"1h"})
    res.status(200)
    .json({message:"login successful", token,role:user.role})
    }else{
      res.status(401).json({message:"invalid"})
    }
    
    }catch(err){
console.log(err)
res.status(500).json({message:"server error"})
    }
})
app.listen(7000,()=>{
    console.log("server is running !!!!....");
})