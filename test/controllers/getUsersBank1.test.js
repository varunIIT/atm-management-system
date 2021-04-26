const {getUserBank1}=require('../../src/controllers/getUsersBank1')
const{expect}=require('chai')

describe('controllers/getUsersBank1.test',()=>{
        it('should return null if userId does not contains only digits',async()=>{
            let user=await getUserBank1('someString','somePin')
            expect(user).to.equal(null)
        })
        it('should return undefined if invalid userId or pin',async()=>{
            let user= await getUserBank1('12','12345')
            expect(user).to.equal(undefined)
        })
        it('should return null if less than 2 arguments are passed',async()=>{
            let user=await getUserBank1()
            expect(user).to.equal(null)
             user=await getUserBank1('12')
            expect(user).to.equal(null)
            
        })
        it('should return null if pin is of type number',async()=>{
            let user=await getUserBank1('1',12)
            expect(user).to.equal(null)
            
        })
        it('should return a valid user if arguments are valid',async()=>{
            let user=await getUserBank1('1','12')
            expect(user).to.have.property('userId')
            expect(user).to.have.property('pin')
            expect(user).to.have.property('name')
            expect(user).to.have.property('amount')
            expect(user).to.have.property('chequeBookRequest')
        })
})

