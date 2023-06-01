const express = require('express');

const { UserModel } = require("../models/usermodel")

const userrouter = express.Router();

require('dotenv').config();

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');


userrouter.post("/register", async (req, res) => {

    const { name, email, password, address: { street, city, state, country, zip } } = req.body;

    const check_email = await UserModel.find({ email });

    if (check_email.length > 0) {
        return res.json({ "msg": "Email Id Already Exists" })
    }

    try {
        bcrypt.hash(password, 5, async (err, secure_password) => {
            if (err) {
                console.log(err)
            } else {
                const user_data = new UserModel({ name, email, password: secure_password, address: { street, city, state, country, zip } });
                await user_data.save();
                res.status(201).json({ "msg": "Successfully Registered The User" })
            }
        })

    } catch (error) {
        console.log(error);
        res.json({ "msg": "Error While Registering the user" })
    }
})


userrouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const find_email = await UserModel.find({ email });
    const hashed_password = find_email[0].password;
    try {
        bcrypt.compare(password, hashed_password, (err, result) => {
            if (err) {
                console.log(err);
                res.json({ "msg": "Password Mismatch" })
            } else {
                let token = jwt.sign({ UserId: find_email[0]._id }, process.env.key);
                res.status(201).json({ "msg": "Successfully Generated the token and logged in", "token": token })
            }
        })

    } catch (error) {
        console.log(error);
        res.json({ "msg": "Error while logging the user" })
    }
})

userrouter.patch("/user/:id/reset", async (req, res) => {
    const id = req.params.id;
    const { email, password, new_password } = req.body
    try {
        let find_by_id = await UserModel.find({ _id: id });
        console.log(find_by_id);
        let hashed_password = find_by_id[0].password
        bcrypt.compare(password, hashed_password, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("password matched successfully")
            }

        }) 
        bcrypt.hash(new_password, 5, async(err, secure_password) => {
            if (err) {
                console.log(err)
            } else {
                console.log("Successfully hashed the new password")
                let update_password = await UserModel.findByIdAndUpdate({ "_id": id }, { "password": secure_password }, { new: true });
                console.log(update_password);
                res.json({ "msg": "Successfully updated the password" })
            }
        })


    } catch (error) {
        console.log(error);
        res.json({ "msg": "Error While Updating the password" })
    }
})

module.exports = {
    userrouter
}


// {
//     "name":"nikhil",
//     "email":"nikhil@gmail.com",
//     "password":"nikhil",
//     "address":{
//       "street":"jsonsquare",
//       "city":"newdelhi",
//       "state":"newdelhi",
//       "country":"India",
//       "zip":"1111"
//     }
//   }


// {

//     "email":"nikhil@gmail.com",
//     "password":"nikhil",
//     "new_password":"nikhil kumar"
   
//   }