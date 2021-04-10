const bcrypt=require('bcrypt')
const SALT_WORK_FACTOR = 10;
bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    bcrypt.hash("zxcv", salt, (err, hash) => {
        // Now we can store the password hash in db.
        console.log(1,hash)


    });
});

//dummyBank1->12,123,1234
//dummyBank2->asdf,12as,zxcv