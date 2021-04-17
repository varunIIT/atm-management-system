const { withdrawal } = require('../controllers/withdrawal')
const {AtmModel}=require('../db/atmModels')
const axios=require('axios')

const withdrawalRoute=require('express').Router()
withdrawalRoute.get('/withdraw',(req,res)=>{
    if(!req.session.user){
        return res.redirect('/login')
    }
     res.render('withdrawal')
    
})
withdrawalRoute.post('/withdrawPost',async (req,res)=>{
    const success=await withdrawal(req,res)
    if(success){
        await  axios.get(`http://localhost:5000/update${req.session.user.bankName}?userId=${req.session.user.userId}&amount=${req.body.amount}`).
                then(()=>{
                    //console.log("user updated successfully")
                    req.session.user.amount-=parseInt(req.body.amount)
                    req.session.save()
                })
                .catch(()=>{
                    console.log("user is not updated,error")
                })
        
    }

    
})
withdrawalRoute.get('/denomination',async(req,res)=>{
    const data=await AtmModel.find({})
    res.send(data[0])
})
module.exports={
    withdrawalRoute
}