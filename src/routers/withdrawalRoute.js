const { updateUserAmount } = require('../controllers/updateAmount')
const { withdrawal } = require('../controllers/withdrawal')
const {AtmModel}=require('../db/atmModels')

const withdrawalRoute=require('express').Router()
withdrawalRoute.get('/withdraw',(req,res)=>{
     res.render('withdrawal')
    
})
withdrawalRoute.post('/withdrawPost',async (req,res)=>{
    const success=await withdrawal(req,res)
    if(success){
        updateUserAmount(req,res)
    }
    
})
withdrawalRoute.get('/denomination',async(req,res)=>{
    const data=await AtmModel.find({})
    res.send(data[0])
})
module.exports={
    withdrawalRoute
}