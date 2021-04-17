const express=require('express')
const app=express()
const port=5000
const session=require('express-session')

app.set('view engine','hbs')

require('./src/db/conn')
const {authRoute}=require('./src/routers/authRoute')
const {bank1Route}=require('./src/routers/bank1Route')
const {bank2Route}=require('./src/routers/bank2Route')
const { changePinRoute } = require('./src/routers/changePinRoute')
const{withdrawalRoute}=require('./src/routers/withdrawalRoute')

app.use(express.json())
app.use(express.urlencoded({extended:true}))  //body parser

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: '24knb6k247b2k7b2k7bk247hb2kh7b2'
  }))

app.use('/',express.static(__dirname+'/src/public'))

app.use('/',authRoute)

app.use('/',bank1Route)
app.use('/',bank2Route)
app.use('/',withdrawalRoute)
app.use('/',changePinRoute)
app.listen(port,()=>{
    console.log(`listening at http://localhost:${port}/login`)
})