const bank1=[
    {
        userId:1,
        pin:12,
        name:'Varun',
        amount:50000

    },
    {
        userId:2,
        pin:123,
        name:'Kunal',
        amount:50000
        
    },
    {
            userId:3,
            pin:1234,
            name:'Maya',
            amount:50000
            
        }

]
const bank2=[
    {
        userId:12,
        pin:12,
        name:'Rahul',
        amount:50000
    },
    {
        userId:23,
        pin:123,
        name:'Kapil',
        amount:50000
        
    },
    {
            userId:34,
            pin:1234,
            name:'Rohan',
            amount:50000
            
        }

]
function getUserBank1(userId,pin){
    for(user of bank1){
        if(user.userId==userId && user.pin==pin){
            return user;
        }
    }
}
function getUserBank2(userId,pin){
    for(user of bank2){
        if(user.userId==userId && user.pin==pin){
            return user;
        }
    }
}
//getUserBank1(2,123)
module.exports={getUserBank1,getUserBank2}