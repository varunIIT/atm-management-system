const bank2Route=require('express').Router()
const {getUserBank2}=require('../controllers/getUsersBank2')
const { updateUserBank2 } = require('../controllers/updateUserBank2')
const { changePinBank2 } = require('../controllers/changePinBank2')
const { chequeBookReqbank2 } = require('../controllers/chequeBookReqBank2')

bank2Route.get('/bank2',async (req,res)=>{
    let userId=parseInt(req.query.userId)
    let pin=(req.query.pin)
    const user=await getUserBank2(userId,pin)
    res.send(user)
})

bank2Route.get('/updatebank2',async(req,res)=>{
    await updateUserBank2(req,res)
    //console.log(2)
    res.send("ok")
})
bank2Route.get('/changePinbank2',async(req,res)=>{
    await changePinBank2(req,res)
    res.send("ok")
})
bank2Route.get('/chequeBookReqbank2',async(req,res)=>{
    await chequeBookReqbank2(req,res)
    res.send('ok')
})



module.exports={bank2Route}