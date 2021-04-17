const changePinRoute=require('express').Router()
const axios=require('axios')

changePinRoute.get('/changePin',(req,res)=>{
    if(!req.session.user){
        return res.redirect('/login')
    }
    res.render('changePin')
})
changePinRoute.post('/changePin',(req,res)=>{
    axios.get(`http://localhost:5000/changePin${req.session.user.bankName}?userId=${req.session.user.userId}&pin=${req.body.newPin}`)
    .then(()=>{
        res.render('changePin',{error:'pin changed successfully'})
    })
    .catch(()=>{
        console.log('error changing pin')
    })

   
})

module.exports={
    changePinRoute
}