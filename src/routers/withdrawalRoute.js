const { withdrawal } = require('../controllers/withdrawal')
const withdrawalRoute=require('express').Router()

withdrawalRoute.post('/withdraw',async (req,res)=>{
    withdrawal(req,res)
})
module.exports={
    withdrawalRoute
}