const mongoose=require('mongoose')
const schema=mongoose.Schema

const DummyBank1Schema=new schema({
    userId:Number,
    //changed to string
    pin:String,
    name:String,
    amount:Number
})

const DummyBank1Model=mongoose.model('DummyBank1Model',DummyBank1Schema)

module.exports={
    DummyBank1Model
}