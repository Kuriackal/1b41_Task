const express= require('express')
const mongoose= require('mongoose')
const morgan= require('morgan')
const bodayParser = require('body-parser')
const cors=  require('cors')
const bodyParser = require('body-parser')
const ShortUrl= require('./models/shortUrls')
require("dotenv").config()

const app= express()

mongoose.connect('mongodb://127.0.0.1:27017/urltask',{
    useNewUrlParser:true,
    
    useUnifiedTopology:true,
})
.then(() =>console.log("DB CONNECTION"))
.catch((err) => console.log('DB CONNECTION ERR',err))

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({limit:"2mb"}))
app.use(cors())

//route
app.get("/api",async(req,res)=>{
    const shortUrls= await ShortUrl.find()
    res.render("index",{shortUrls,shortUrls})
})
app.use(express.urlencoded({extended:false}))
app.post('/shortUrls',async(req,res)=>{
  await  Shorturl.create({full: req.body.fullUrl})
  res.redirect('/')

})
app.get('/:shortUrl',async(req,res) =>{
   const shortUrl= await ShortUrl.findOne({
    short:req.params.shortUrl
   })
   if(shortUrl == null) return res.sendStatus(404)
   shortUrl.click++
shortUrl.save()

res.redirect(shortUrl.full)

})

const port = process.env.PORT || 8000
app.listen(port,()=>console.log(`SErver is ${port}`))