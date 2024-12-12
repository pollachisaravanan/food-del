import React,{useContext} from 'react'
import './cart.css'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const Cart = () => {

  const notify = () => toast("This is a toast notification!");
  const {cardItems,food_list,removeFromCart,getTotalCartAmount,url} = useContext(StoreContext);
  const navigate = useNavigate()  
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br/>
        <hr/>
        {food_list.map((items,index)=>{
          if(cardItems[items._id] > 0){
            return (
              <div>
                  <div className="cart-items-title cart-items-item">
                  <img src={`${url}/image_storage/${items.file_name}`} alt=""/>
                  <p>{items.name}</p>
                  <p>₹{items.price}</p>
                  <p>{cardItems[items._id]}</p>
                  <p>₹{items.price * cardItems[items._id]}</p>
                  <p onClick = {()=>removeFromCart(items._id)}className='remove-icon'>x</p>
                  </div>
                  <hr/>
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
          <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                <div className="cart-total-details">
                  <p>Sub Total</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr/>
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                </div>
                <hr/>
                <div className="cart-total-details">
                  <p>Total</p>
                  <p className="total-amount">${getTotalCartAmount() === 0 ? getTotalCartAmount() : getTotalCartAmount()+2}</p>
                </div>
              </div>
              <button disabled={getTotalCartAmount() === 0} onClick={()=>getTotalCartAmount() === 0 ? toast.info('Kindly Item to Continue !') : navigate('/order')}>PROCEED TO CHECKOUT</button>
              
          </div>
          <div className="cart-promo-code">
            <div>
              <p>If you have Promo Code , Enter it here</p>
              <div className="cart-promo-code-input">
                <input type="text" placeholder='Promo Code' />
                <button>Submit</button>
              </div>
            </div>
          </div>
      </div>
      
    </div>
  )
}

export default Cart
