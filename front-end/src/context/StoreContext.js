import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";
export const StoreContext = createContext(null);


const StoreContextProvider  = (props) =>{

    const [cardItems,setCardItems] = useState({});

    const [token,setToken] = useState('');

    const url = `http://localhost:5000`

    const[food_list,setFoodList] =  useState([])

    const addToCart = async (itemId) =>{
        if(!cardItems[itemId]){
            setCardItems((prev) =>({...prev,[itemId]:1}))
        }
        else{
            setCardItems((prev) =>({...prev,[itemId]:prev[itemId] + 1}))
        }
        if(token){
            await axios.post(`${url}/api/food/create/addToCart`,{itemId},{ 
                headers: { 
                  token:token
                }})
        }
    }

    const removeFromCart = async (itemId) =>{
        setCardItems((prev) =>({...prev,[itemId]:prev[itemId] - 1}))

        if(token){
            await axios.post(`${url}/api/food/update/removeFromCart`,{itemId},{ 
                headers: { 
                  token:token
                }})
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const items in cardItems) {
            if (cardItems[items] > 0) {
                let tempItemInfo = food_list.find((product) => product._id === items)
                totalAmount += tempItemInfo.price * cardItems[items]
            }
        }
        return totalAmount;
    }

    const masterFoodList = async () =>{
        const response = await axios.get(`${url}/api/food/retrieve/getFoodList`);
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) =>{
        const response = await axios.post(`${url}/api/food/retrieve/getCardItems`,{},{ 
            headers: { 
              token:token
            }
        })
        setCardItems(Object.keys(response.data.data[0]).length > 0 ? response.data.data[0].cardData : {})
    }

    useEffect(async () =>{
            await masterFoodList()
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem('token'))
                await loadCartData(localStorage.getItem('token'))
            }
    },[])

    const contextValue = {
        food_list,
        cardItems,
        setCardItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
