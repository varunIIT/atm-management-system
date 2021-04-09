const mongoose=require('mongoose')
const schema=mongoose.Schema

const DummyBank2Schema=new schema({
    userId:Number,
    pin:Number,
    name:String,
    amount:Number
})

const DummyBank2Model=mongoose.model('DummyBank2Model',DummyBank2Schema)
module.exports={
    DummyBank2Model
}