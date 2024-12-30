import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

import HouseImage from '../assets/icons/android-chrome-192x192.png';
import FormInput from '../components/FormInput';

const Login = () => {
  const [email, setEmail] = useState('johndoe@gmail.com');

  return (
    <div className='flex flex-col gap-3 rounded-md p-8 shadow-lg w-[300px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
      <img src={HouseImage} alt='leaf logo' className='block mx-auto w-10 h-10' />
      <p className='mb-5 text-xl text-center font-bold'>Login to FreshTrack</p>

      <label>Email</label>
      <FormInput
        value={email}
        placeholder='Enter your email'
        onChange={e => setEmail(e.target.value)}
      />

      <label>Password</label>
      <FormInput placeholder='Enter your password' />

      <button className='h-10 text-white bg-green-500 rounded-md' onClick={() => {}}>
        Login
      </button>

      <button className='border rounded-md h-10 border-gray-200 flex gap-5 items-center justify-center'>
        <FaGoogle />
        <span>Login with Google</span>
      </button>

      <p className='text-gray-500'>
        Don't have an account?&nbsp;
        <Link href='/register' className='text-green-400'>
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
