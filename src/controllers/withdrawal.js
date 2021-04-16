const { TransactionModel, AtmModel } = require('../db/atmModels')
const withdrawal=async (req,res)=>{
    try{
        if(req.body.amount=='0'){
            res.render('withdrawal',{error:'Please increase your amount!',color:'red'})
            return 0
        }
        let amount =parseInt(req.body.amount)
        //console.log(req.body)
        const atmData=await AtmModel.find({})
        const atmAmount=atmData[0].atmAmount
        const atmReceipt=atmData[0].receipt
        const receipt=req.body.receipt
        // console.log(req.session)

        if(amount>req.session.user.amount){
          res.render('withdrawal',{error:`You have Rs. ${req.session.user.amount} in your account!`,color:'red'})
          return 0
        }
        
        else if(amount>atmAmount){
         res.render('withdrawal',{error:'please reduce your amount!',color:'red'})
         return 0
        }
        let flag=0
        let userReceipt
        let atmId=1212
        await AtmModel.findOneAndUpdate({atmUniqueNumber:atmId},{atmAmount:atmAmount-amount})
        if(!receipt&flag==0){
            userReceipt=0
            res.render('withdrawal',{error:'Your transaction is successfull!',color:'green'})
            flag=1
        }
        else if(atmReceipt!=0&flag==0){
            userReceipt=1
            res.render('withdrawal',{error:'Your transaction is successfull,Please collect your receipt!',color:'green'})
            flag=1

        }
    
        else if(flag==0){
            userReceipt=0
            res.render('withdrawal',{error:'Your transaction is successfull,We are running out of receipts!',color:'green'})
        }
        let note100=atmData[0].note100
        let note200=atmData[0].note200
        let note500=atmData[0].note500
        let note2000=atmData[0].note2000
        await AtmModel.findOneAndUpdate({atmUniqueNumber:atmId},{
            receipt:atmReceipt-userReceipt,
            note100:note100-req.body.note100,
            note200:note200-req.body.note200,
            note500:note500-req.body.note500,
            note2000:note2000-req.body.note2000})
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