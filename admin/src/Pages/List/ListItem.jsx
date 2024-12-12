import React from 'react'
import './ListItem.css'
import { useState } from 'react'
import {toast} from "react-toastify"
import { useEffect } from 'react'
import axios from "axios"
const ListItem = () => {

  const url = `http://localhost:5000`
  const [list,setList] = useState([]);

  const fetchList = async () =>{
    const response = await axios.get(`${url}/api/food/retrieve/retrieve`);
    console.log(response);
    if(response.status == 200){
      setList(response.data)
      toast.success('Food List retrieved Successfully!')
    }
    else{
      toast.error('Error in Retrieveal')
    }
  }

  const removeFoodList = async (id) =>{
    const response = await axios.put(`${url}/api/food/update/updateFood`,{
      id:id
    });
    if(response.status == 204){
      toast.success('Food Removed !')
    }
    fetchList();
  }

  useEffect(() =>{
    fetchList()
  },[])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index) =>{
          return (
            <div key = {index} className='list-table-format'>
              <img src={`http://localhost:5000/image_storage/${item.file_name}`} alt=""/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className='cursor' onClick={()=>removeFoodList(item._id)}>x</p>
            </div>
          )
        })}
      </div>
      
    </div>
  )
}

export default ListItem
