import React, { useState } from 'react';
import axios from 'axios';
import { useSignIn } from 'react-auth-kit';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Login Failed');

  const signIn = useSignIn();

  const navigate = useNavigate();

  const onLoginSubmit = async () => {
    setErrorModal(false);

    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, user);

      signIn({
        token: res.data.access_token,
        tokenType: 'Bearer',
        expiresIn: 3600,
        authState: res.data.user,
      });

      navigate('/dashboard');
    } catch (e: any) {
      setErrorModal(true);
      setErrorMessage(e.response.data.message);
    }
  };

  const LoginError = () => {
    return (
      <>
        <p className='bg-red-700 text-white font-semibold px-5 py-2 absolute top-6 right-6 rounded'>
          {errorMessage}
        </p>
      </>
    );
  };

  return (
    <div className='bg-gray-900 h-screen w-screen flex justify-center items-center'>
      {errorModal && <LoginError />}
      <div className='bg-black/25 w-1/4 h-96 rounded-xl text-white'>
        <h1 className='p-6 text-center text-xl bg-gray-800 rounded-t-xl'>
          LOGIN
        </h1>
        <div className='p-6 flex flex-col justify-center items-center'>
          <input
            type='text'
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className='p-4 bg-transparent border-2 border-gray-800 w-full my-2 rounded'
            placeholder='Email ID'
          />
          <input
            type='password'
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className='p-4 bg-transparent border-2 border-gray-800 w-full my-2 rounded'
            placeholder='Password'
          />
          <button
            onClick={() => onLoginSubmit()}
            className='py-3 px-12 bg-gray-800 rounded m-5'
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
