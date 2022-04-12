import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckOTP = () => {
  const [checkOTP, setCheckOTP] = useState({
    email: '',
    otp: '',
  });
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  const checkOTPChange = (e) => {
    setCheckOTP({ ...checkOTP, [e.target.name]: e.target.value });
  };

  const otpSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.post(
      'https://achievexsolutions.in/current_work/eatiano/api/auth/check_otp',
      {
        email: checkOTP.email,
        otp: checkOTP.otp,
      }
    );

    setLoading(false);
    const resData = res.data;
    console.log(resData);
    setCheckOTP({
      email: '',
      otp: '',
    });
    localStorage.setItem('passwordToken', resData.forget_password_token);
    history('/setNewPassword', { replace: true });
  };

  return (
    <>
      <h1 className='mb-12 text-4xl font-bold text-center text-gray-100 lg:text-5xl font-rubik mt-28 md:mt-40 lg:mt-48 lg:mb-20'>
        Check OTP
      </h1>
      <div className='container mb-10 font-rubik md:mb-28'>
        <div className='max-w-lg px-10 py-10 mx-auto shadow-lg bg-secondary rounded-xl'>
          <form onSubmit={otpSubmitHandler}>
            <div className='mb-6 md:mb-9'>
              <h6 className='mb-3 text-lg font-medium text-gray-200 lg:text-xl md:mb-5'>
                <label>Email</label>
              </h6>
              <input
                type='email'
                required
                name='email'
                value={checkOTP.email}
                onChange={checkOTPChange}
                className='w-full px-3 py-2 text-gray-300 rounded-md outline-none lg:text-lg bg-primary focus:ring-offset-2 ring-2 ring-primary'
              />
            </div>

            <div className='mb-6 md:mb-9'>
              <h6 className='mb-3 text-lg font-medium text-gray-200 lg:text-xl md:mb-5'>
                <label>OTP</label>
              </h6>
              <input
                type='number'
                required
                name='otp'
                value={checkOTP.otp}
                onChange={checkOTPChange}
                className='w-full px-3 py-2 text-gray-300 rounded-md outline-none lg:text-lg bg-primary focus:ring-offset-2 ring-2 ring-primary'
              />
            </div>

            {loading ? (
              <p className='text-lg font-medium text-center text-gray-300 font-rubik md:text-xl'>
                Verifying OTP...
              </p>
            ) : (
              <button
                type='submit'
                className='w-full px-8 py-2 my-6 text-lg font-medium text-gray-900 transition-all duration-300 rounded-lg hover:text bg-cta md:text-xl hover:bg-cta-dark hover:scale-110 focus:ring-2 ring-offset-2 ring-cta-dark'
              >
                Check OTP
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckOTP;
