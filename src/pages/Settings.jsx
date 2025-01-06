import React, { useState } from 'react'
import FormInput from '../components/FormInput';
import Toggle from '../components/Toggle';
const Settings = () => {
    const[name, setName] = useState('')
    const [email, setEmail] = useState('');

  return (
    <div className='w-screen h-screen py-5 flex flex-col items-center'>
      <div className='p-6  w-[40%]'>
      <h1 className='font-bold text-lg mb-4'>Settings</h1>

      {/*----------------------------------- settings form -----------------*/}
      <div className=' p-3 shadow-lg rounded-lg mb-5'>
        <p className='font-bold text-xs mb-3'>Profile Settings</p>
        
        <label className='text-xs'>Name</label>
         <FormInput
        value={name}
        placeholder='John Doe'
        onChange={e => setName(e.target.value)}
        />
        
        <label className='text-xs'>Email</label>
      <FormInput
        value={email}
        placeholder='Enter your email'
        onChange={e => setEmail(e.target.value)}
      />

        <label className='text-xs'>Password</label>
        <FormInput placeholder='*************' />
      
      </div>
{/*---------------------------------------- Notification --------------------- */}
      <div className=' p-3 shadow-lg rounded-lg'>
        <p className='font-bold text-xs mb-3'>Notification Preferences</p>
       <div className='flex justify-between text-sm tracking-tighter mb-3'>
        Daily reminder {<Toggle/>}
        </div> 
       <div className='flex justify-between text-sm tracking-tighter'>
       Expiring Soon Alerts {<Toggle/>}
        </div> 
      </div>
      
        <button className='w-full rounded-lg text-white mt-5 p-2 text-center bg-secondary text-sm font-bold'>
            Save changes
        </button>
      </div>
      
    </div>
  )
}

export default Settings
