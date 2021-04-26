const {changePinBank2 }=require('../../src/controllers/changePinBank2')
const{expect}=require('chai')

describe('controllers/changePinBank2.test',()=>{
    it('should return null if less than 2 arguments are passed',async()=>{
        let changedPin=await changePinBank2()
        expect(changedPin).to.equal(null)

        changedPin=await changePinBank2('12')
        expect(changedPin).to.equal(null)
    })
    it('should return null if pin is of type number',async()=>{
        let changedPin=await changePinBank2(12,'1')
        expect(changedPin).to.equal(null)
        
    })
    
    it ('should update pin successfully if arguments are valid',async()=>{
        let isPinChanged=await changePinBank2('12','1')
        expect(isPinChanged).to.equal(1)
    })
})
