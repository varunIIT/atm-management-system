const bank1=[
    {
        userId:1,
        pin:12,
        name:'Varun'
    },
    {
        userId:2,
        pin:123,
        name:'Kunal'
        
    },
    {
            userId:3,
            pin:1234,
            name:'Maya'
            
        }

]
const bank2=[
    {
        userId:12,
        pin:12,
        name:'Rahul'
    },
    {
        userId:23,
        pin:123,
        name:'Kapil'
        
    },
    {
            userId:34,
            pin:1234,
            name:'Rohan'
            
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