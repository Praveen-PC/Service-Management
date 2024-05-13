const express=require('express')
const http=require('http')
const bodyparser=require('body-parser')
const path=require('path')
const mongoose=require('mongoose')
const { name } = require('ejs')

const url="mongodb://localhost:27017/curd"
mongoose.connect(url)
const db=mongoose.connection

const app=express()

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))


app.get('/',(req,res)=>{
    res.render('./index.ejs')
    var data={
        name:"pc",
        age:22,
        city:"coimbatore",
     }
     db.collection('operation').insertOne(data,(err,db)=>{
        if (err) throw  err
        console.log("record inserted")
     })
   
})


const port=process.env.port || 3000
app.listen(port,()=>{
    console.log(`server running on ${port}`)
})


