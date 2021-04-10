const { TransactionModel, AtmModel } = require('../db/atmModels')
const mongoose=require('mongoose')
const withdrawal=async (req,res)=>{
    try{
        let amount =parseInt(req.body.amount)
        const atmData=await AtmModel.find({})
        const atmAmount=atmData[0].atmAmount
        const atmReceipt=atmData[0].receipt
        const receipt=req.body.receipt
        if(amount>req.session.user.amount){
          res.render('withdrawal',{error:`You have Rs. ${req.session.user.amount} in your account!`,color:'red'})
          return 0
        }
        
        else if(amount>atmAmount){
         res.render('withdrawal',{error:'please reduce your amount',color:'red'})
         return 0
        }
        let flag=0
        let userReceipt
        let atmId=1212
        await AtmModel.findOneAndUpdate({atmUniqueNumber:atmId},{atmAmount:atmAmount-amount})
        if(!receipt&flag==0){
            userReceipt=0
            res.render('withdrawal',{error:'Your transaction is successfull',color:'green'})
            flag=1
        }
        else if(atmReceipt!=0&flag==0){
            userReceipt=1
            res.render('withdrawal',{error:'Your transaction is successfull,Please collect your receipt',color:'green'})
            flag=1

        }
    
        else if(flag==0){
            userReceipt=0
            res.render('withdrawal',{error:'Your transaction is successfull,We are running out of receipts',color:'green'})
        }
        await AtmModel.findOneAndUpdate({atmUniqueNumber:atmId},{receipt:atmReceipt-userReceipt})
        await TransactionModel.create({
            userId:req.session.user.userId,
            name:req.session.user.name,
            bankName:req.session.user.bankName,
            withdrawalAmount:amount,
            receipt:userReceipt
        })

        return 1;
    }
    catch(err){
        console.log(err)
    }
    
}
module.exports={withdrawal}