import express from "express";
import { Connect } from "../db-connection.js";
const addFood  = express.Router()
import multer from "multer";
import { addFoodController,addUser,addToCart,placeOrder } from "../controllers/createFoodList.js";
import authMiddleWare from'../middleware/auth.js'


const storage = multer.diskStorage({
    destination:"image_storage",
    filename:(req,file,cb) =>{
        console.log(file)
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

addFood.post("/addFood",upload.single("image"),addFoodController)

addFood.post("/register",addUser);

addFood.post("/addtoCart",authMiddleWare,addToCart);

addFood.post("/placeOrder",authMiddleWare,placeOrder);





export default addFood

