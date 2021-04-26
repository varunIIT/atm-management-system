const {updateUserBank1 }=require('../../src/controllers/updateUserBank1')
const{expect}=require('chai')

describe('controllers/updateUserBank1.test',()=>{
    it('should return null if less than 2 arguments are passed',async()=>{
        let updatedUser=await updateUserBank1()
        expect(updatedUser).to.equal(null)

        updatedUser=await updateUserBank1('12')
        expect(updatedUser).to.equal(null)
    })
    it ('should update user successfully if arguments are valid',async()=>{
        let updatedUser=await updateUserBank1('1','300')
        expect(updatedUser).to.have.property('userId')
        expect(updatedUser).to.have.property('pin')
        expect(updatedUser).to.have.property('name')
        expect(updatedUser).to.have.property('amount')
        expect(updatedUser).to.have.property('chequeBookRequest')
    })

})
