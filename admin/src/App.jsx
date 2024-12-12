import React from 'react'
import SideBar from './Components/SideBar/SideBar'
import Navbar from './Components/Navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import AddItem from './Pages/add-items/AddItem'
import ListItem from './Pages/List/ListItem'
import Orders from './Pages/Orders/Orders'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className='app-content'>
        <SideBar/>
        <Routes>
          <Route path='/add' element = {<AddItem/>} />
          <Route path='/list' element = {<ListItem/>} />
          <Route path='/order' element = {<Orders/>} />  
        </Routes>
      </div>
    </div>
  )
}

export default App
