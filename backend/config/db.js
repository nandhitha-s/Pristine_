import mongoose, { connect } from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://nandhithasakthivel:pristine@cluster0.eyxet.mongodb.net/pristine').then(()=>{
        console.log("Database connected")
    })
}

