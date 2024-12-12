import React, { useState } from 'react'
import Header from '../../components/Header/header'
import MenuFile from '../../components/ExploreMenu/MenuFile'
import './home.css'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
const Home = () => {
  const [category,setCategory] = useState("All");
  return (
    <div>
        <Header/>
        <MenuFile category={category} setCategory = {setCategory}/>
        <FoodDisplay  category={category}/>
        <AppDownload/>
    </div>
  )
}

export default Home
