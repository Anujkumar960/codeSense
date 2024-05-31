const express =require("express");
const cors=require("cors");
const { ConnectToDb } = require("./src/Config/connectToDB");
const { UserRouter } = require("./src/Route/userRoute");

const PORT=3000;
const app=express();
app.use(express.json());
app.use(cors());

app.use("/",UserRouter);




app.listen(PORT,async()=>{
    await ConnectToDb();
    console.log(`Your Port is Running on http://localhost:${PORT}`)
});