const express = require('express');
const { connection } = require("./config/db");

const { userrouter } = require("./routes/userroute");

const {resturantrouter}=require("./routes/resturantroute");

const {orderrouter}=require("./routes/orderroute")


const app = express();
require('dotenv').config()

app.use(express.json());

app.get("/",(req,res)=>{
    res.json("welcome")
})

app.use("/users", userrouter);

app.use("/res",resturantrouter);

app.use("/order",orderrouter);

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log(`Server is ruuning on port ${process.env.port}`)
    } catch (error) {
        console.log(error);
        console.log(`Error While Connecting To Database`)
    }
})