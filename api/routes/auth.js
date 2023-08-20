const router = require('express').Router() ;
const User = require('../models/User') ;
const bcrypt = require('bcrypt');



// Register 

router.post('/register',async (req ,res)=>{

    try{
        const salt = await bcrypt.genSalt(10) ;
        const hashedPass = await bcrypt.hash(req.body.password,salt)
        const newUser = new User({
            username : req.body.userName ,
            email : req.body.email ,
            password : hashedPass
        }) ;
        const user = await newUser.save() ;

        res.status(200).json(user) ;

    } catch(error){
        res.status(500).json(error)
    }
})

// Login 

router.post("/login",async(req,res)=>{
   
    try{
        const user = await User.findOne({username:req.body.username});
        !user && res.status(400).json('Wrong credentials')

        const validated = await bcrypt.compare({password:req.body.password});
        !validated && res.status(400).json('Wrong credentials')
        console.log(validated)

        const {password, ...others} = user._doc ;
        res.status(200).json(others) ;
        console.log(others)
    }
    
    catch(error){
        res.status(500).json(error)
    }
})

module.exports =router