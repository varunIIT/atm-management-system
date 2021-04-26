const {changePinBank1 }=require('../../src/controllers/changePinBank1')
const{expect}=require('chai')

describe('controllers/changePinBank1.test',()=>{
    it('should return null if less than 2 arguments are passed',async()=>{
        let changedPin=await changePinBank1()
        expect(changedPin).to.equal(null)

        changedPin=await changePinBank1('12')
        expect(changedPin).to.equal(null)
    })
    it('should return null if pin is of type number',async()=>{
        let changedPin=await changePinBank1(12,'1')
        expect(changedPin).to.equal(null)
        
    })
    
    it ('should update pin successfully if arguments are valid',async()=>{
        let isPinChanged=await changePinBank1('12','1')
        expect(isPinChanged).to.equal(1)

    })
})
