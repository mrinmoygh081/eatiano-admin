import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SetNewPassword = () => {
  const [newPassword, setNewPassword] = useState({
    passwordToken: localStorage.getItem('passwordToken'),
    password: '',
    email: '',
  });
  const history = useNavigate();

  const newPasswordChange = (e) => {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
  };

  const newPasswordSubmitHandler = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      'https://achievexsolutions.in/current_work/eatiano/api/auth/change_password',
      {
        email: newPassword.email,
        forget_password_token: newPassword.passwordToken,
        password: newPassword.password,
      }
    );

    const resData = res.data;
    console.log(resData);
    setNewPassword({
      passwordToken: '',
      password: '',
      email: '',
    });
    localStorage.removeItem('passwordToken');
    history('/signin', { replace: true });
  };

  return (
    <>
      <h1 className='mb-12 text-4xl font-bold text-center text-gray-100 lg:text-5xl font-rubik mt-28 md:mt-40 lg:mt-48 lg:mb-20'>
        Set New Password
      </h1>
      <div className='container mb-10 font-rubik md:mb-28'>
        <div className='max-w-lg px-10 py-10 mx-auto shadow-lg bg-secondary rounded-xl'>
          <form onSubmit={newPasswordSubmitHandler}>
            <div className='mb-6 md:mb-9'>
              <h6 className='mb-3 text-lg font-medium text-gray-200 lg:text-xl md:mb-5'>
                <label>Email</label>
              </h6>
              <input
                type='email'
                required
                name='email'
                value={newPassword.email}
                onChange={newPasswordChange}
                className='w-full px-3 py-2 text-gray-300 rounded-md outline-none lg:text-lg bg-primary focus:ring-offset-2 ring-2 ring-primary'
              />
            </div>

            <div className='mb-6 md:mb-9'>
              <h6 className='mb-3 text-lg font-medium text-gray-200 lg:text-xl md:mb-5'>
                <label>Password Token (Don't Change It)!!</label>
              </h6>
              <input
                type='password'
                required
                name='passwordToken'
                value={newPassword.passwordToken}
                onChange={newPasswordChange}
                className='w-full px-3 py-2 text-gray-300 rounded-md outline-none lg:text-lg bg-primary focus:ring-offset-2 ring-2 ring-primary'
              />
            </div>

            <div className='mb-6 md:mb-9'>
              <h6 className='mb-3 text-lg font-medium text-gray-200 lg:text-xl md:mb-5'>
                <label>Password</label>
              </h6>
              <input
                type='password'
                required
                name='password'
                value={newPassword.password}
                onChange={newPasswordChange}
                className='w-full px-3 py-2 text-gray-300 rounded-md outline-none lg:text-lg bg-primary focus:ring-offset-2 ring-2 ring-primary'
              />
            </div>

            <button
              type='submit'
              className='w-full px-8 py-2 my-6 text-lg font-medium text-gray-900 transition-all duration-300 rounded-lg hover:text bg-cta md:text-xl hover:bg-cta-dark hover:scale-110 focus:ring-2 ring-offset-2 ring-cta-dark'
            >
              Set Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SetNewPassword;
