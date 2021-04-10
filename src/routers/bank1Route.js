const bank1Route=require('express').Router()
const {getUserBank1}=require('../controllers/getUsersBank1')

bank1Route.get('/bank1',async (req,res)=>{
    let userId=parseInt(req.query.userId)
    //change made:pin to string 
    let pin=req.query.pin
    const user=await getUserBank1(userId,pin)
    res.send(user)
})

module.exports={bank1Route}