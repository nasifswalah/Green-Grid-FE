import React, { useState } from 'react';
import './AuthBox.css'
import CustomInput from '../Common/CustomInput/CustomInput';
import axios from 'axios';
import { ErrorToast, successToast } from '../../Plugins/Toast/Toast';
import { useDispatch } from 'react-redux';
import { showHideLoader } from '../../redux/generalSlice';

function SignupPage({setBoxType}) {
  const [signupData, setSignupData] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e)=>{
    setSignupData({...signupData,[e.target.name]:e.target.value})
  }

  const doSignup=()=>{
    dispatch(showHideLoader(true))
    if(signupData.password===signupData.confirmPassword) {
      axios({
        method:'POST',
        url: process.env.REACT_APP_BASE_URL+'/auth/dosignup',
        data:signupData
      })
      .then((res)=>{
        successToast(res.message)
        setBoxType('login')
        dispatch(showHideLoader(false))
      })
      .catch((err)=>{
        dispatch(showHideLoader(false))
        ErrorToast(err?.response?.data?.message || 'Somrthing went wrong!')
      })
    } else {
      ErrorToast("Passwords doesn't match");
    }
  }

  return (
    <>
      <div className='d-flex flex-column' >
        <div className='mt-4'>
          <CustomInput label={'First Name'} name={'firstName'} value={signupData.firstName} onchange={handleChange} />
        </div>

        <div className='mt-4'>
          <CustomInput label={'Last Name'} name={'lastName'} value={signupData.lastName} onchange={handleChange} />
        </div>

        <div className='mt-4'>
          <CustomInput label={'Email'} type={'email'} name={'email'} value={signupData.email} onchange={handleChange}/>
        </div>

        <div className='mt-4'>
          <CustomInput label={'Mobile Number'} type={'number'} name={'mobileNumber'} value={signupData.mobileNumber} onchange={handleChange}/>
        </div>

        <div className='mt-4'>
          <CustomInput label={'Password'} type={'password'} name={'password'} value={signupData.password} onchange={handleChange}/>
        </div>

        <div className='mt-4'>
          <CustomInput label={'Confirm Password'} type={'password'} name={'confirmPassword'} value={signupData.confirmPassword} onchange={handleChange}/>
        </div>

        <button className='common-button mt-4 align-self-center' onClick={doSignup}>Sign up</button>
        <p className='already-account mt-4' >Already have an account <i onClick={() => setBoxType('login')}>login here</i> </p>
      </div>
    </>
  )
}

export default SignupPage