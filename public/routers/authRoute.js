const  authRoute=require('express').Router()
const axios=require('axios')

authRoute.post('/login',(req,res)=>{
  axios.get(`http://localhost:5000/${req.body.bankName}?userId=${req.body.userId}&pin=${req.body.pin}`)
  .then((response)=>{
    if(!response.data){
      res.render('login',{error:"Invalid Credentials"})
    }
    else{
      req.session.user=response.data
      res.redirect('/')
    }
    
  })
  .catch((err)=>{
    console.log(err)
  })

})

authRoute.get('/login',(req,res)=>{
  res.render('login')
})
module.exports={
  authRoute
}