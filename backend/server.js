import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
// import orderRouter from "./routes/orderRoute.js";

import "dotenv/config"
import cartRouter from "./routes/cartRoute.js";
// import orderRouter from "./routes/orderRoute.js";
//app config
const app = express()
const port = 4000

app.use(express.json()) //get the request from frontend to backend
app.use(cors()) // access bacend from any frontend

app.get("/",(req,res)=>{
    res.send("Connected")
}) //request datas

connectDB();

//api end point
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/auth/user",userRouter)
app.use("/api/cart",cartRouter)
// app.use("/api/order", orderRouter);
// app.use("/api/order",orderRouter)
app.listen(port,()=>{
    console.log(`running on port ${port}`)
})
