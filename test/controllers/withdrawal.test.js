const { withdrawal } = require("../../src/controllers/withdrawal");
const{expect}=require('chai')
let req={
    session:{
        language:"english",    //user's balance
        user:{amount:'10',
            name:'testName',
            userId:2,
            bankName:'testBankName'},
        save:()=>{}     
    },
    render:()=>{},
    body:{ amount:'10',
        receipt:1,
        note100:'0',
        note200:'0',
        note500:'0',
        note1000:'0',
        note2000:'0'}        // withdrawal amount
                     
}

let res={render:()=>{}}

describe('controllers/withdrawal.test (if language is hindi)',()=>{
   it('should return boolean value 0 for rs.0 withdrawal',async()=>{
    req.body.amount='0';
    let withdrawalStatus =  await withdrawal(req,res)
    expect(withdrawalStatus).to.equal(0)
   })
   it('should return boolean 0 if withdrawal amount is greater than user balance',async()=>{
    req.session.user.amount='1000';
    req.body.amount='2000'
    let withdrawalStatus =  await withdrawal(req,res)
    expect(withdrawalStatus).to.equal(0)
   })

   it('should return 0 if user has enough cash in account and tries to withdraw it but atm does not have enough cash',async()=>{
    req.session.user.amount='500000'
    req.body.amount='500000'
    let withdrawalStatus =  await withdrawal(req,res)
    expect(withdrawalStatus).to.equal(0)
   })
   it('it should return 1,if there are no conflicts and receipt is true,(make sure atm has cash >= 500)',async()=>{
       req.session.user.amount='1000'
       req.body.amount='500'
       req.body.note500='1'
       req.body.receipt='1'
       let withdrawalStatus=await withdrawal(req,res)
       expect(withdrawalStatus).to.equal(1)
   })
   it('it should return 1,if there are no conflicts and receipt is false,(make sure atm has cash >= 500)',async()=>{
    req.session.user.amount='1000'
    req.body.amount='500'
    req.body.note500='1'
    req.body.receipt='0'
    let withdrawalStatus=await withdrawal(req,res)
    expect(withdrawalStatus).to.equal(1)
    })
})

describe('controllers/withdrawal.test (if language is english)',()=>{
    
    req.session.language='hindi'    
    it('should return boolean value 0 for rs.0 withdrawal',async()=>{
        req.body.amount='0';
        let withdrawalStatus =  await withdrawal(req,res)
        expect(withdrawalStatus).to.equal(0)
       })
       it('should return boolean 0 if withdrawal amount is greater than user balance',async()=>{
        req.session.user.amount='1000';
        req.body.amount='2000'
        let withdrawalStatus =  await withdrawal(req,res)
        expect(withdrawalStatus).to.equal(0)
       })
    
       it('should return 0 if user has enough cash in account and tries to withdraw it but atm does not have enough cash',async()=>{
        req.session.user.amount='500000'
        req.body.amount='500000'
        let withdrawalStatus =  await withdrawal(req,res)
        expect(withdrawalStatus).to.equal(0)
       })
       it('it should return 1,if there are no conflicts and receipt is true,(make sure atm has cash >= 500)',async()=>{
           req.session.user.amount='1000'
           req.body.amount='500'
           req.body.note500='1'
           req.body.receipt='1'
           let withdrawalStatus=await withdrawal(req,res)
           expect(withdrawalStatus).to.equal(1)
       })
       it('it should return 1,if there are no conflicts and receipt is false,(make sure atm has cash >= 500)',async()=>{
        req.session.user.amount='1000'
        req.body.amount='500'
        req.body.note500='1'
        req.body.receipt='0'
        let withdrawalStatus=await withdrawal(req,res)
        expect(withdrawalStatus).to.equal(1)
       })
})
