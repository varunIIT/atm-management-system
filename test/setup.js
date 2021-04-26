process.env.NODE_ENV='testing'

before(()=>{
    require('./../src/db/conn')
})