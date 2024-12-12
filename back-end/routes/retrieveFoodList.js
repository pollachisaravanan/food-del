import express from "express";
import { Connect } from "../db-connection.js";
import { retrieveFoodController,loginUser,getCartItems,getFoodList,getOrderDetails,getallOrderDetails } from "../controllers/retrieveFoodController.js";
const retrieveFood  = express.Router()
import authMiddleWare from'../middleware/auth.js'



retrieveFood.get("/retrieve",retrieveFoodController);

retrieveFood.post("/loginUser",loginUser)

retrieveFood.post("/getCardItems",authMiddleWare,getCartItems);

retrieveFood.get("/getFoodList",getFoodList);

retrieveFood.post("/getOrderDetails",authMiddleWare,getOrderDetails);

retrieveFood.get("/getallOrderDetails",getallOrderDetails);



export default retrieveFood