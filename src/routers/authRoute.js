const  authRoute=require('express').Router()
const axios=require('axios')
const { AtmModel } = require('../db/atmModels')

authRoute.post('/login',async (req,res)=>{
  //todo hashing 
  const salt = await bcrypt.genSalt(10);
  const pin = await bcrypt.hash(req.body.pin,salt);
  axios.get(`http://localhost:5000/${req.body.bankName}?userId=${req.body.userId}&pin=${pin}`)
  .then((response)=>{
    if(!response.data){
      res.render('login',{error:"Invalid Credentials"})
    }
    else{
      req.session.user=response.data
      req.session.user.bankName=req.body.bankName
      res.redirect('/withdraw')
    }
    
  })
  .catch((err)=>{
    console.log(err)
  })

})

authRoute.get('/login',async (req,res)=>{
  res.render('login')
})
module.exports={
  authRoute
}