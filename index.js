import express from "express";
import dotenv from "dotenv";

import userRoute from "./routes/user.route.js";
import cors from"cors"
import ConnectDB from "./config/Db.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
  res.send({
    message: `Server is working on Port : ${PORT}`,
    Status: true,
    error: false,
  });
});

ConnectDB()



app.use("/api/user",userRoute);

app.listen(PORT,()=>{
    console.log(`Server is Working on Port : ${PORT}`)
})