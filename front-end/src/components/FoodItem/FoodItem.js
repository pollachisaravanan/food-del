import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
const FoodItem = ({id,name,price,description,image}) => {

  const {cardItems,addToCart,removeFromCart,url} = useContext(StoreContext);
  return (
    <div className='food-item'>
      <div className='food-item-image-container'>
            <img src={`${url}/image_storage/${image}`} className='food-item-image' alt=""/>
            { !cardItems[id] ? <img className='add' src={assets.add_icon_white} onClick={ ()=>addToCart(id)}/>
            : <div className='food-item-counter'>
              <img onClick = {()=>addToCart(id)} src={assets.add_icon_green} className=''/>
              <p>{cardItems[id]}</p>
              <img onClick = {()=>removeFromCart(id)} src={assets.remove_icon_red} className=''/>
              </div>
              
            }
            <div className='food-item-name-rating'>
                <p>{name}</p>
                <img src={assets.rating_starts} alt=""/>
            </div>
            <p className='food-item-desc'>
                {description}
            </p>
            <p className='food-item-price'>${price}</p>
      </div>
    </div>
  )
}

export default FoodItem
