const  authRoute=require('express').Router()
const axios=require('axios')

authRoute.post('/login',async (req,res)=>{
  //todo hashing 
  axios.get(`http://localhost:5000/${req.body.bankName}?userId=${req.body.userId}&pin=${req.body.pin}`)
  .then((response)=>{
    
      req.session.user=response.data
      req.session.user.bankName=req.body.bankName
      res.redirect('/menu/menu.html')
    }
    
  )
  .catch((err)=>{
    res.render('login',{error:"Invalid Credentials!"})
  })

})

authRoute.get('/login', (req,res)=>{
  res.render('login')
})
authRoute.get('/user',(req,res)=>{
  res.send({user:req.session.user.name})
})
module.exports={
  authRoute
}