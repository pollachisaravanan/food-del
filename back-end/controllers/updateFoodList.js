import fs from 'fs'
import { Connect } from "../db-connection.js";
import { ObjectId } from 'mongodb';

const updateFoodController =  async(req,res)=>{
    try{
        let id = req.body.id
        const db = await Connect(); 
        const collection = db.collection('food_list_items'); 
        const data = await collection.updateOne({
            _id:new ObjectId(id)
        },{
            $set:{
                is_active:false
            }
    })
        return res.status(204).json({
            messType:"S",
            messText:"Food List addded Successfully !"
        });
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            messText:"E",
            messType:"Error in adding Food !"
        })
    }
}

const removeFromCart = async(req,res) =>{
    try{
        const db = await Connect(); 
        const collection = db.collection('m_food_users_list'); 
        let userData = await collection.find({
            _id:new ObjectId(req.body.userId),
            is_active:true
        }).toArray();


        if(userData.length > 0){
            let cardData = userData[0]?.cardData ? userData[0]?.cardData :{}
            if(cardData[req.body.itemId] > 0){
                cardData[req.body.itemId] -= 1
            }
    
            let updateData = await collection.updateOne({
                _id : new ObjectId(req.body.userId)
            },{
                $set:{
                  cardData:cardData
                }
            })
            return res.status(200).json({
                messText:"S",
                messType:"Cart Updated Successfully !"
            })
        }
        else{
            return res.status(200).json({
                messText:"E",
                messType:"Unable to find the User!"
            })
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            messText:"E",
            messType:"Error in removeFrom Cart API !"
        })
    }
}

const updatePayment = async(req,res) =>{
    try{
        const {orderId,success} = req.body;
        if(success == "true"){
            const db = await Connect(); 
            const collection = db.collection('user_orders');
            let updateData = await collection.updateOne({
                _id : new ObjectId(orderId)
            },{
                $set:{
                  payment:true,
                  is_active:true,
                  payment_date:new Date(),
                  status:"Food Processing"
                }
            })
            return res.status(200).json({
                messText:"Payment updated Successfully !",
                messType:"S"
            })
        }
        else{
            const db = await Connect(); 
            const collection = db.collection('user_orders');
            let updateData = await collection.deleteOne({
                _id : new ObjectId(orderId)
            })
            return res.status(200).json({
                messText:"Payment updated Successfully !",
                messType:"S"
            })
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            messText:"Error in removeFrom Cart API !",
            messType:"E"
        })
    }
}

const updateStatus = async(req,res) =>{
    try{
        let status = req.body.status
        const db = await Connect(); 
        const collection = db.collection('user_orders'); 
        let updateStatus = await collection.updateOne({
            _id:new ObjectId(req.body.orderId),
        },{
            $set:{
                status:status
            }
        });
        return res.status(200).json({
            messText:"Status updated Successfully !",
            messType:"S"
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            messText:"Error in Status Update API !",
            messType:"E"
        })
    }
}


export {updateFoodController,removeFromCart,updatePayment,updateStatus}