const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const baseurl = `${window.location.origin}/api`;

const PORT = process.env.PORT || 9000

dotenv.config({path:'./config.env'})
const DB = process.env.MONGO_URI

mongoose.connect(DB).then(()=>{
    console.log("connection successfull")
}).catch((e)=>{
    console.log(e)
})

const keeperSchema = new mongoose.Schema({
    title:String,
    description:String
})

const Keeper = new mongoose.model("KEEPER",keeperSchema)
const app = express()
app.use(express.urlencoded())
app.use(express.json())
app.use(cors())


app.post("/api/addNew",(req,res)=>{
    const{title,description} = req.body;
    const keeperObj = new Keeper({
        title,
        description           // we can also write only title and description 
    })
    console.log(keeperObj)
    keeperObj.save((err)=>{
        if(err){
            console.log(err)
        }
    })

    Keeper.find({},(err, keeperList)=>{
        if(err){
            console.log(err)
        }else{
            res.send(keeperList)
        }
    })
})
app.get("/api/getAll",(req,res)=>{
    Keeper.find({},(err, keeperList)=>{
        if(err){
            console.log(err)
        }else{
            res.send(keeperList)
        }
    })
    
})



app.post("/api/delete",(req,res)=>{
    const {id} = req.body
    Keeper.deleteOne({_id:id},()=>{
        Keeper.find({},(err, keeperList)=>{
            if(err){
                console.log(err)
            }else{
                res.send(keeperList)
            }
        })    
    })
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'keeper', 'build')));
    app.get('/*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'keeper', 'build', 'index.html'));
    })
}

app.listen(PORT,()=>{
    console.log("backend created at port no 9000")
})

export default (url, options) => fetch(baseurl + url, options);