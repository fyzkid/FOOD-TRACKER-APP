import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import HouseImage from '../assets/icons/leaf-logo.png';
import FormInput from '../components/FormInput';

const Login = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate();
  function validateEmail(e) {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      return alert("Please enter a valid email")
    }
    else{
      navigate("/Dashboard")
    }
  }

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center py-20'>
      <div className='flex flex-col gap-3 rounded-md p-8 shadow-lg w-[300px]'>
      <img src={HouseImage} alt='leaf logo' className='block mx-auto w-7 h-6' />
      <p className=' text-lg text-center font-bold'>Login to FreshTrack</p>

      <label>Email</label>
      <FormInput
        value={email}
        placeholder='Enter your email'
        onChange={e => setEmail(e.target.value)}
      />

      <label>Password</label>
      <FormInput  placeholder='Enter your password' type="password"/>

      <button  onClick={validateEmail} className='h-8 w-full text-white text-sm bg-green-500 rounded-md' >
        Login
      </button>


      <button className='border rounded-md h-8 text-sm border-gray-200 flex gap-5 items-center justify-center'>
        <FaGoogle />
        <span>Login with Google</span>
      </button>

      <p className='text-gray-500 text-sm mx-auto'>
        Don't have an account?&nbsp;
        <Link href='/register' className='text-green-400'>
          Sign up
        </Link>
      </p>
    </div>
    </div>
  );
};

export default Login;
