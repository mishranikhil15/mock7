const express=require('express');

const {OrderModel}=require("../models/ordermodel");

const {authenticate}=require("../middlewares/authenticate")

const orderrouter=express.Router();

orderrouter.post("/orders", authenticate, async(req,res)=>{
   const user_id=req.body.UserId;
   console.log(user_id)
   const payload=req.body;
//    console.log(payload)

try {
    let data=new OrderModel(payload,user_id);
    await data.save();
    res.json({"msg":"successfully placed the order","data":data})
} catch (error) {
    console.log(error);
    res.json({"msg":"Error while posting the order"})
}

})

orderrouter.get("/orders/:id", authenticate, async(req,res)=>{
    let id=req.params.id;
    let user_id=req.body.UserId;
    // console.log(id,user_id)
    try {
        let data=await OrderModel.find({"_id":id})
        res.json({"msg":data})
    } catch (error) {
        console.log(error);
        res.json({"msg":"Error while getting the orderData"})
    }
})

module.exports={
    orderrouter
}

