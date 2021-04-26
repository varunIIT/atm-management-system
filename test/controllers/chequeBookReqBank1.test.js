const {chequeBookReqBank1}=require('../../src/controllers/chequeBookReqBank1')
const{expect}=require('chai')

describe('controllers/chequeBookReqBank1.test',()=>{
    it('should return null if less than 1 arguments are passed',async()=>{
        let updatedUser=await chequeBookReqBank1()
        expect(updatedUser).to.equal(null)
        
    })
    it('should return a valid updated user if argument is valid',async()=>{
        let updatedUser=await chequeBookReqBank1('1')
        expect(updatedUser).to.have.property('userId')
        expect(updatedUser).to.have.property('pin')
        expect(updatedUser).to.have.property('name')
        expect(updatedUser).to.have.property('amount')
        expect(updatedUser).to.have.property('chequeBookRequest')
    })
})