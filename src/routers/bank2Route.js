const bank2Route=require('express').Router()
const {getUserBank2}=require('../controllers/getUsersBank2')

bank2Route.get('/bank2',async (req,res)=>{
    let userId=parseInt(req.query.userId)
    let pin=parseInt(req.query.pin)
    const user=await getUserBank2(userId,pin)
    res.send(user)
})

module.exports={bank2Route}