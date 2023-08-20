const express = require('express') ;
const app = express() ;
const mongoose = require('mongoose') ;
const dotenv = require('dotenv') ;
const cors = require('cors')
const authRoute = require("./routes/auth") ;
const userRoute = require("./routes/users") ;
const postRoute = require("./routes/posts") ;
const multer = require('multer')
dotenv.config();
app.use(express.json()) ;
app.use(cors());



const conectionParams ={
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }

mongoose.connect(process.env.MONGO_URL, conectionParams).then(() => {
    console.log('connect successfuly')
}).catch((e) => {
    console.log(e)
})

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images')
    },filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})

const upload = multer({storage:storage}) ;
app.post('/api/upload',upload.single('file'),(req,res)=>{
    res.status(200).json('file has been uploaded')
})


app.use("/api/auth" ,authRoute) ;
app.use("/api/users" ,userRoute) ;
app.use("/api/posts" ,postRoute) ;



app.listen('5000',()=>{
    console.log('server is running on port 5000')
} )