const { getUserBank1, getUserBank2 } = require('../../dummyBanks')

const bankRoute=require('express').Router()

bankRoute.get('/bank1',(req,res)=>{
    let userId=parseInt(req.query.userId)
    let pin=parseInt(req.query.pin)
    const user=getUserBank1(userId,pin)
    res.send(user)
})
bankRoute.get('/bank2',(req,res)=>{
    let userId=parseInt(req.query.userId)
    let pin=parseInt(req.query.pin)
    const user=getUserBank2(userId,pin)
    res.send(user)
})
module.exports={bankRoute}