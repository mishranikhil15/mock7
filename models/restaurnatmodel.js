const mongoose = require('mongoose');


// {
//     _id: ObjectId,
//     name: String,
//     address: {
//       street: String,
//       city: String,
//       state: String,
//       country: String,
//       zip: String
//     },
//     menu: [{
//       _id: ObjectId,
//       name: String,
//       description: String,
//       price: Number,
//       image: String
//     }]
//   }

const ResSchema = mongoose.Schema({
    name: String,
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    menu: [{

        name: String,
        description: String,
        price: Number,
        image: String
    }]
})

const ResModel = mongoose.model("Resturant", ResSchema);

module.exports = {
    ResModel
}
