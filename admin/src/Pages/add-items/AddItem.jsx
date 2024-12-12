import React, { useEffect, useState } from 'react'
import './AddItem.css'
import { assets } from '../../assets/assets'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const AddItem = () => {

  const [image,setImage]  = useState(false)
  const [data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"1"
  })

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data =>({
        ...data,[name]:value
    }))
  }

  const onSubmitHandler =   async (event) =>{
    event.preventDefault();
    const formData = new FormData()
    console.log(data)
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("price",data.price)
    formData.append("category",data.category)
    formData.append("image",image)
    let url = 'https://food-del-nwqb.onrender.com'
    const response = await axios.post(`${url}/api/food/create/addFood`,formData);

    console.log(response.data['messType'])
    
   
    if(response.data['messType'] == 'S'){
      setData({
        name:"",
        description:"",
        price:"",
        category:"1"
      })
      setImage(false)
      toast.success('Data Added !')
    }
    else{
      toast.error(response)
    }



  }

  useEffect(() =>{
    console.log(data)
  }),[data]
   return (
    <div className='add'>
      <form action= "" className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={image ? URL.createObjectURL(image):assets.upload_area} alt=""/>

          </label>
          <input onChange = {(e) => setImage(e.target.files[0])} type='file' id='image' hidden required/>
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input  onChange={onChangeHandler} value = {data.name} type='text' name='name' placeholder='Type here'/>
          <div className="add-product-description flex-col">
            <p>Product Description</p>
            <textarea onChange={onChangeHandler} value = {data.description} name="description" rows="6" placeholder='Write Content here' required ></textarea>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Product category</p>
              <select onChange={onChangeHandler} name="category">
                <option value="1">Salad</option>
                <option value="2">Rolls</option>
                <option value="3">Desert</option>
                <option value="4">SandWich</option>
                <option value="5">Cake</option>
                <option value="6">PureVeg</option>
                <option value="7">Pasta</option>
                <option value="8">Noodles</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Product Price</p>
              <input onChange={onChangeHandler} value = {data.price} type="number" name= "price" placeholder = "$20"/>
            </div>
          </div>
          <button type="submit" className='add-button'>ADD</button>
        </div>
      </form>
    </div>
  )
}

export default AddItem
