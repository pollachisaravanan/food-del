import React from 'react'
import './MenuFile.css'
import { menu_list } from '../../assets/assets'

const MenuFile = ({category,setCategory}) => {
  return (
    <div>
      <div className='explore-menu' id="explore-menu">
        <h1> Explore our Menu</h1>
        <p className='explore-menu-text'>Choose a diverse menu featuring a detectable array</p>
        <div className='explore-menu-list'>
            {menu_list.map((item,index) => {
                return (
                    <div onClick={()=>setCategory(prev => prev === item.menu_name ? "All" : item.menu_name )}key={index} className='explore-menu-list-item'>
                            <img className={category === item.menu_name ? "active": ""} src={item.menu_image}/>
                            <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr/>
      </div>
    </div>
  )
}

export default MenuFile
