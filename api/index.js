const express=require('express')
const morgan=require('morgan')
const bodyParser=require('body-parser')
const app=express()
const mongoose=require('mongoose')

const productsRouter=require('./routes/products')
const ordersRouter=require('./routes/orders')
const userRouter=require("./routes/users")

mongoose.connect('mongodb+srv://shop_rest:1111@cluster0-ozx1s.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('db conected')
  })

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/uploads', express.static("uploads"))

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Autorizatiom')
    if(req.method==='OPTIONS'){
     res.header('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE')
     res.status(200).json({})
    }
    next()
})


app.use('/products',productsRouter)
app.use('/orders',ordersRouter)
app.use('/users',userRouter)

app.use((req,res,next)=>{
    const error= new Error('Not found')
    error.status=404
     next(error)
})

app.use((error,req,res,next)=>{
    res.status(error.status|| 500)
    res.json({
        message:error.message
    })
})


module.exports=app