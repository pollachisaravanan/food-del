import express from "express"
import cors from "cors"
import {Connect} from "./db-connection.js"
import retrieveFood from "./routes/retrieveFoodList.js"
import addFood from "./routes/createFood.js"
import updateFood from "./routes/updateFood.js"
import dotenv from 'dotenv';
//Middleware

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
dotenv.config();

//Route Definition

app.use("/api/food/retrieve",retrieveFood)
app.use("/api/food/create",addFood)
app.use("/api/food/update",updateFood)


// retrieve Images from Server Folder

app.use(express.static('public'));
app.use('/image_storage', express.static('image_storage'));


app.get("/",(req,res)=>{
    res.send("Console Working")
})

app.listen(port,async ()=>{
    await Connect();
    console.log(`Server Started on http://localhost:${port}`)
})