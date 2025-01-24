const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const {middleware} = require("./middleware/middleware");
const authRoutes = require("./controllers/auth");
// const foodRoutes = require("./controllers/food");
// const passRoutes = require("./api/forgotpass");
app.use(cors({
    origin: ['http://127.0.0.1:3000'],
    credentials: true
    
}));
app.use(express.json())
app.use(middleware)
app.use('/api/auth',authRoutes);
// app.use('/api/food',foodRoutes);
// app.use('/api/password',passRoutes);
app.use(bodyParser.json());

app.listen(8000,()=>{ 
    console.log("Listening on port 8000");
})
