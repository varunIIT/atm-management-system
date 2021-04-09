const { updateUserAmount } = require('../controllers/updateAmount')
const { withdrawal } = require('../controllers/withdrawal')
const withdrawalRoute=require('express').Router()
withdrawalRoute.get('/withdraw',(req,res)=>{
    if(!req.session.user){
        return res.redirect('./login')
    }
    res.render('withdrawal')
    
})
withdrawalRoute.post('/withdrawPost',async (req,res)=>{
    const success=await withdrawal(req,res)
    if(success){
        updateUserAmount(req,res)
    }
    
})
module.exports={
    withdrawalRoute
}