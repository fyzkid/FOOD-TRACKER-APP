import React from 'react'
import HouseImage from '../assets/icons/leaf-logo.png';
import Login from './Login';
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className='h-screen w-screen bg-gradient-to-b from-[#EBFCF4] to-background flex justify-center items-center'>
      <div className='p-5 flex flex-col justify-center items-center'>
            <img src={HouseImage} alt='leaf logo' className='block mx-auto w-12 h-10' />  
            <h1 className='text-secondary font-bold tracking-tighter text-2xl my-5'>FRESH TRACK</h1>
            <p className='text-primary text-xs font-medium mb-5'>Track your food, reduce your waste</p>
            <Link to="/Login">
            <button className='rounded-md bg-primary p-2 text-xs text-white'>Get Started</button>
      </Link>
            
        </div>
    </div>
  )
}

export default Home
