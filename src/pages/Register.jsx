import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import HouseImage from '../assets/icons/leaf-logo.png';
import FormInput from '../components/FormInput';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://fresh-track-api.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: fullName, email, password, role: 'User' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      sessionStorage.setItem('currentUser', JSON.stringify(data?.user?.name));

     
      localStorage.setItem('userName', fullName);

      console.log('Stored userName:', localStorage.getItem('userName'));

     
      navigate('/login');
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center py-20'>
      <div className='flex flex-col gap-3 rounded-md p-8 shadow-lg w-[300px]'>
        <img src={HouseImage} alt='leaf logo' className='block mx-auto w-7 h-6' />
        <p className='text-lg text-center font-bold'>Register</p>

        <label htmlFor='fullName'>Full Name</label>
        <FormInput
          id='fullName'
          type='text'
          value={fullName}
          autoComplete='username'
          placeholder='Enter your full name'
          onChange={(e) => setFullName(e.target.value)}
        />

        <label htmlFor='email'>Email</label>
        <FormInput
          id='email'
          type='email'
          value={email}
          autoComplete='username'
          placeholder='Enter your email'
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor='password'>Password</label>
        <FormInput
          id='password'
          type='password'
          value={password}
          placeholder='Enter your password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className='h-8 w-full text-white text-sm bg-green-500 rounded-md'>
          Register
        </button>

        <p className='text-gray-500 text-sm mx-auto'>
          Have an account?&nbsp;
          <Link to='/login' className='text-green-400'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
