const { AtmModel } = require('../db/atmModels')
const { DummyBank1Model } = require('../db/dummyBank1model')
const { DummyBank2Model } = require('../db/dummyBank2model')

const dummyBank1=[
    {"userId":1,"pin":"$2b$10$CLZRopj5Wr8zBCnp6SZh4e1Gr89M41TXsL/RLm.5RvR5HcQKcjGIC","name":"Varun","amount":292900,"chequeBookRequest":false},
    {"userId":2,"pin":"$2b$10$/N6Q6m2sVwVvjD2ybkYk4uynQgsC2r/oTJBdIyiJ/aGaygQKPbiEm","name":"Kunal","amount":50000,"chequeBookRequest":false},
    {"userId":3,"pin":"$2b$10$b3LQUJzM5dTsn0W65OgDmu7tZ/p44W5YuypmMeJP8xXgpNZbZm3pe","name":"Maya","amount":50000,"chequeBookRequest":false}

]
const dummyBank2=[
    {"userId":12,"pin":"$2b$10$tZKoHKvZHm1z.EvROKPF0uj.5AYGS3uUZgDu5DjgXmzX8X0L246Nm","name":"Rahul","amount":48800,"chequeBookRequest":false},
    {"userId":23,"pin":"$2b$10$aKb6j8FZ//XPFCdLbzreY.BVXzmQRKLFR73YTysPak1MWMBOUcmHW","name":"Kapil","amount":50000,"chequeBookRequest":false},
    {"userId":34,"pin":"$2b$10$HMwj6qeGhpxcgAf8d2PVAODh113QfeMpeCzo3Fw62xyisOCt0MG4G","name":"Rohan","amount":50000,"chequeBookRequest":false}

]
const createDatabasesRoute=require('express').Router()
createDatabasesRoute.post('/create',async(req,res)=>{
    await DummyBank1Model.insertMany(dummyBank1)
    await DummyBank2Model.insertMany(dummyBank2)
    await AtmModel.create({"atmUniqueNumber":1212,"atmAmount":300000,"receipt":176,"note100":100,"note200":136,"note2000":97,"note500":118})
    res.send("done")
})
module.exports={createDatabasesRoute}