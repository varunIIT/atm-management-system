const {chequeBookReqBank2}=require('../../src/controllers/chequeBookReqBank2')
const{expect}=require('chai')

describe('controllers/chequeBookReqBank2.test',()=>{
    it('should return null if less than 1 arguments are passed',async()=>{
        let updatedUser=await chequeBookReqBank2()
        expect(updatedUser).to.equal(null)
        
    })
    it('should return a valid updated user if argument is valid',async()=>{
        let updatedUser=await chequeBookReqBank2('12')
        expect(updatedUser).to.have.property('userId')
        expect(updatedUser).to.have.property('pin')
        expect(updatedUser).to.have.property('name')
        expect(updatedUser).to.have.property('amount')
        expect(updatedUser).to.have.property('chequeBookRequest')
    })
})