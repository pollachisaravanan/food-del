import express from "express";
import { Connect } from "../db-connection.js";
const updateFood  = express.Router()
import multer from "multer";
import { updateFoodController,removeFromCart,updatePayment,updateStatus } from "../controllers/updateFoodList.js";
import authMiddleWare from'../middleware/auth.js'


updateFood.put("/updateFood",updateFoodController)
updateFood.post("/removeFromCart",authMiddleWare,removeFromCart)
updateFood.post("/updatePayment",updatePayment)
updateFood.post("/updateStatus",updateStatus)

export default updateFood

