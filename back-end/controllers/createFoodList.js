import fs from 'fs'
import { Connect } from "../db-connection.js";
import validator from 'validator';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb';
import Stripe from "stripe";



const addFoodController =  async(req,res)=>{
    try{
        let price = req.body.price
        let food_name  = req.body.name
        let description = req.body.description
        let category = req.body.category
        let file_name = req.file.filename
        const db = await Connect(); 
        const collection = db.collection('food_list_items'); 
        const data = await collection.insertOne({
            "price":Number(price),
            "name":food_name,
            "description":description,
            "category":Number(category),
            "file_name":file_name,
            "is_active":true,
            "created_on":new Date(),
            "created_by":"Admin"
        });
        return res.status(200).json({
            messType:"S",
            messText:"Food List addded Successfully !"
        });
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            messType:"E",
            messText:"Error in adding Food !"
        })
    }
}

const addUser = async(req,res) =>{

    const {name,password,email} = req.body
    try{
        const db = await Connect(); 
        const collection = db.collection('m_food_users_list'); 
        const checkUser = await collection.find({
            email:email,
            is_active:true
        }).toArray();

        if(checkUser.length > 0)
            return res.status(200).json({
                messType:"E",
                messText:"User Already exists !"
            })
        if(!validator.isEmail(email))
            return res.status(200).json({
                messType:"E",
                messText:"Please Enter a Valid email"
            })
        if(password.length < 8)
            return res.status(200).json({
                messType:"E",
                messText:"Please Enter a Strong Password"
            })
        const salt = await bcrypt.genSalt(10)
        const hashed_password = await bcrypt.hash(password,salt)

        const data = await collection.insertOne({
           "user_name":name,
           "password":hashed_password,
           "email":email,
           "is_active":true
        });

        const token = createToken(data.insertedId)

        return res.status(500).json({
            messType:"S",
            messText:"User added Successfully !",
            data:token
        })
        
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            messType:"E",
            messText:"Error in addUser API !"
        })
    }
}

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const addToCart = async(req,res) =>{
    try{
        const db = await Connect(); 
        const collection = db.collection('m_food_users_list'); 
        let userData = await collection.find({
            _id:new ObjectId(req.body.userId),
            is_active:true
        }).toArray();


        if(userData.length > 0){
            let cardData = userData[0]?.cardData ? userData[0]?.cardData :{}
            if(!cardData[req.body.itemId]){
                cardData[req.body.itemId] = 1
            }
            else{
                cardData[req.body.itemId] += 1
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
            messType:"E",
            messText:"Error in addtoCart API !"
        })
    }
}

const placeOrder = async(req,res) =>{
    try{
        const db = await Connect(); 
        const collection = db.collection('user_orders');
        const update_collection = db.collection('m_food_users_list')

        const data = await collection.insertOne({
            "userId":req.body.userId,
            "items":req.body.items,
            "amount":req.body.amount,
            "address":req.body.address,
         });

         let updateData = await update_collection.updateOne({
            _id : new ObjectId(req.body.userId)
        },{
            $set:{
              cardData:{}
            }
        })

        const line_items = req.body.items.map((item) =>({
            price_data : {
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount : item.price*100*80
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount : 2*100*80
            },
            quantity:1
        })

        const stripe = new Stripe(process.env.STRIPE_SECRET)


        const stripe_session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`http://localhost:3000/verify?success=true&orderId=${data.insertedId}`,
            cancel_url:`http://localhost:3000/verify?success=false&orderId=${data.insertedId}`
        })

        console.log(stripe_session)

        return res.status(200).json({
            messText:"payment Done Successful !",
            messType:"S",
            data: stripe_session  
        })


    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            messType:"E",
            messText:"Error in placeOrder API !"
        })
    }
}




export {addFoodController,addUser,addToCart,placeOrder}