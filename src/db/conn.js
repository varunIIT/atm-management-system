const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/ATM-db',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(()=>{console.log("database connected successfully")})
.catch(()=>{console.log("database connection is unsuccessful")})
