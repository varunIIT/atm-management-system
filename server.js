const express=require('express')
const app=express()
const port=5000
const session=require('express-session')

app.set('view engine','hbs')

require('./public/db/conn')
const {authRoute}=require('./public/routers/authRoute')
const {bankRoute}=require('./public/routers/bankRoute')
const{withdrawalRoute}=require('./public/routers/withdrawalRoute')
app.use(express.json())
app.use(express.urlencoded({extended:true}))  //body parser

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: '24knb6k247b2k7b2k7bk247hb2kh7b2',
  }))
app.use('/',authRoute)
app.use('/',bankRoute)
app.use('/',withdrawalRoute)






app.get('/',(req,res)=>{
    res.render('withdrawal')

})

app.listen(port,()=>{
    console.log(`listening at http://localhost:${port}`)
})