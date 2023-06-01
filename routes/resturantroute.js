const express = require('express');

const { ResModel } = require("../models/restaurnatmodel");
const { UserModel } = require('../models/usermodel');

const resturantrouter = express.Router();


resturantrouter.post("/add", async (req, res) => {
    const payload = req.body;

    try {
        const new_resturant = new ResModel(payload);
        await new_resturant.save();
        res.json({ "msg": "Successfully added the resturant data", "data": new_resturant })

    } catch (error) {
        console.log(error);
        res.json({ "msg": "Error while adding the restaurant" })
    }
})

resturantrouter.get("/restaurants", async (req, res) => {
    try {
        const res_data = await ResModel.find();
        res.status(200).json({ "msg": res_data })
    } catch (error) {
        console.log(error);
        res.json({ "msg": "Error while getting resturant data" })
    }
})

resturantrouter.get("/restaurants/:id", async (req, res) => {
    let id = req.params.id;
    try {
        const res_data = await ResModel.find({ _id: id });
        res.status(200).json({ "msg": res_data })
    } catch (error) {
        console.log(error);
        res.json({ "msg": "Error while getting resturant data" })
    }
})

resturantrouter.get("/restaurants/:id/menu", async (req, res) => {
    let id = req.params.id;
    try {
        const res_data = await ResModel.find({ _id: id });
        const menu = res_data[0].menu
        res.status(200).json({ "msg": menu })
    } catch (error) {
        console.log(error);
        res.json({ "msg": "Error while getting resturant data" })
    }
})

resturantrouter.patch("/restaurants/:id/menu", async (req, res) => {
    const payload = req.body;
    const id = req.params.id;

    const res_data = await ResModel.find({ "_id": id });
    // console.log(res_data)
    if (res_data.length == 0) {
        return res.json({ "msg": "Resturant doesn't exists" })
    }
    try {
        res_data[0].menu.push(payload);

        let updated_res = await ResModel.findByIdAndUpdate({ _id: id }, { menu: res_data[0].menu }, { new: true });
        console.log(updated_res);
        res.json({ "msg": "Successfully added the data in menu" })

    } catch (error) {
        console.log(error);
        res.json({ "msg": "Error while updating the resturant" })
    }
})


resturantrouter.delete("/restaurants/:id/menu/:ID", async (req, res) => {
    const payload = req.body;
    const res_id = req.params.id;
    const men_id=req.params.ID;

    // console.log(res_id,men_id)

    const res_data = await ResModel.find({ "_id": res_id });
    // console.log(res_data)
    if (res_data.length == 0) {
        return res.json({ "msg": "Resturant doesn't exists" })
    }
    try {
      
        let arr=[]
       for(let i=0;i<res_data[0].menu.length;i++){
        console.log(res_data[0].menu[i]._id)
         if(res_data[0].menu[i]._id!=men_id){
            arr.push(res_data[0].menu[i])
         }
        
       }
      
      console.log(arr);

      let del_data=await ResModel.findByIdAndUpdate({_id:res_id},{menu:arr},{new:true});
      console.log(del_data);
      res.json({"msg":"Successfully deleted the menu data","new_data":del_data})

    } catch (error) {
        console.log(error);
        res.json({ "msg": "Error while deleting the menu_data" })
    }
})


module.exports = {
    resturantrouter
}


// {
//     "name":"Paradise",
//     "address":{
//         "street":"jsonsquare",
//         "city":"newdelhi",
//         "state":"newdelhi",
//         "country":"India",
//         "zip":"1111"
//       },
//       "menu":[{
//         "name":"vegthali",
//         "description":"fullveg",
//         "price":100,
//         "image":"https://via.placeholder.com/350x250"
//       }]
//   }