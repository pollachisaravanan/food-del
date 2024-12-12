import fs from 'fs'
import { Connect } from '../db-connection.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imageFolder = path.join(__dirname, 'image_storage');
import validator from 'validator';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb';

const retrieveFoodController =  async(req,res)=>{
    try{
        const db = await Connect(); 
        const collection = db.collection('food_list_items'); 
        const data = await collection.aggregate([
            {
                $match: {
                    is_active: true
                }
            },
            {
                $lookup: {
                    from: "m_food_list",
                    localField: "category",
                    foreignField: "id",
                    as: "user_orders"
                }
            },
            {
                $unwind: {
                    path: "$user_orders",      // Unwind the user_orders array
                    preserveNullAndEmptyArrays: false // Optional: Exclude documents without matches
                }
            },
            {
                $project: {
                    price: 1,
                    name: 1,
                    description: 1,
                    file_name: 1,
                    category: "$user_orders.name" // Corrected to reference user_orders.name
                }
            }
        ]).toArray();
        res.status(200).json(data);
    }
    catch(err){
        console.error('Error retrieving data:', err);
        res.status(500).json({ message: "Error retrieving data" });
    }
}

const loginUser = async(req,res) =>{
    try{
        const {email,password} = req.body
        const db = await Connect();
        const collection = db.collection('m_food_users_list'); 
        const checkUser = await collection.find({
            email:email,
            is_active:true
        }).toArray();
        if(checkUser.length == 0)
            return res.status(500).json({
                messType:"E",
                messText:"User doesn't Exists !"
            })
        const isMatch = await bcrypt.compare(password,checkUser[0].password)

        if(!isMatch)
            return res.status(500).json({
                messType:"E",
                messText:"Invalid Credentials"
            })

        const token = createToken(checkUser[0]._id)

        return res.status(200).json({
            messType:"S",
            messText:"User Logged in Successfully !",
            data:token
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            messType:"E",
            messText:"Error in Login User API !"
        })
    }
}

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const getCartItems = async(req,res) =>{
    try{
        const db = await Connect();
        const collection = db.collection('m_food_users_list');
        const cardData = await collection.aggregate([
            {
                $match:{
                    _id:new ObjectId(req.body.userId),
                    is_active:true
                }
            },
            {
                $project:{
                    cardData:1,
                    _id:0
                }
            }
        ]).toArray();

        return res.status(200).json({
            messType:"S",
            messText:"Customer Cart retrieved Successfully !",
            data:cardData
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            messType:"E",
            messText:"Error in Customer Cart retrieval API !"
        })
    }
}

const getFoodList = async(req,res) =>{
    try{
        const db = await Connect(); 
        const collection = db.collection('food_list_items'); 
        let data = await collection.aggregate([
            {
                $match: {
                    is_active: true
                }
            },
            {
                $lookup: {
                    from: "m_food_list",
                    localField: "category",
                    foreignField: "id",
                    as: "user_orders"
                }
            },
            {
                $unwind: {
                    path: "$user_orders",      // Unwind the user_orders array
                    preserveNullAndEmptyArrays: false // Optional: Exclude documents without matches
                }
            },
            {
                $project: {
                    price: 1,
                    name: 1,
                    description: 1,
                    file_name: 1,
                    category: "$user_orders.name" // Corrected to reference user_orders.name
                }
            }
        ]).toArray();
        return res.status(200).json({
            messType:"S",
            messText:"Master Food List retrieved Successfully !",
            data:data
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            messType:"E",
            messText:"Error in Customer Cart retrieval API !"
        })
    }
}

const getOrderDetails = async(req,res)=>{
    try{
        const db = await Connect(); 
        const collection = db.collection('user_orders');
        let data = await collection.find({
            userId:req.body.userId
        }).toArray()

        return res.status(200).json({
            messType:"S",
            messText:"Order Details retrieved Successfully !",
            data:data
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            messType:"E",
            messText:"Error in getOrderDetails API !"
        })
    }
}


const getallOrderDetails = async(req,res) =>{
    try{
        const db = await Connect(); 
        const collection = db.collection('user_orders');
        let data = await collection.find({}).toArray()

        return res.status(200).json({
            messType:"S",
            messText:"All Order Details retrieved Successfully !",
            data:data
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            messType:"E",
            messText:"Error in getAllOrderDetails API !"
        })
    }
}

export {retrieveFoodController,loginUser,getCartItems,getFoodList,getOrderDetails,getallOrderDetails}