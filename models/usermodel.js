const mongoose = require('mongoose');

// {
//     _id: ObjectId,
//     name: String,
//     email: String,
//     password: String,
//     address: {
//       street: String,
//       city: String,
//       state: String,
//       country: String,
//       zip: String
//     }
//   }

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    }
})

const UserModel=mongoose.model("users",UserSchema);

module.exports={
    UserModel
}