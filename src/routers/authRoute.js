const  authRoute=require('express').Router()
const axios=require('axios')

authRoute.post('/login',async (req,res)=>{
  //todo hashing 
  const remote_url=`https://atm-machine-april-2021.herokuapp.com/${req.body.bankName}?userId=${req.body.userId}&pin=${req.body.pin}`
  axios.get(remote_url||`http://localhost:5000/${req.body.bankName}?userId=${req.body.userId}&pin=${req.body.pin}`)
  .then((response)=>{
      if(!response.data){
        return res.render('login',{error:"Invalid Credentials!"})
      }
      
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
authRoute.get('/logout',(req,res)=>{
  req.session.user=null
  res.redirect('/login')
})
module.exports={
  authRoute
}