import React, { useState } from 'react';
import './AuthBox.css';
import CustomInput from '../Common/CustomInput/CustomInput';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ErrorToast, successToast } from '../../Plugins/Toast/Toast';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/userSlice';
import { showHideLoader } from '../../redux/generalSlice';

function LoginPage({setBoxType}) {
  const [loginData, setLoginData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin =(e)=>{
    setLoginData({...loginData,[e.target.name]:e.target.value})
  }

  const doLogin = ()=>{
    dispatch(showHideLoader(true))
      axios({
        method:"POST",
        url: process.env.REACT_APP_BASE_URL+'/auth/dologin',
        data:loginData
      })
      .then((res)=>{
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('user',JSON.stringify(res.data.user))
        dispatch(setUserData(res.data.user))
        navigate('/home')
        dispatch(showHideLoader(false))
        successToast(res.message)
      })
      .catch((err)=>{
        dispatch(showHideLoader(false))
        ErrorToast(err?.response?.data?.message || 'Somrthing went wrong!')
      })
  }

  return (
    <>
    <div className='d-flex flex-column' >
    <div className='mt-4'>
      <CustomInput label={'Email'} name={'email'} value={loginData.email} onchange={handleLogin} />
    </div>

    <div className='mt-4'>
      <CustomInput label={'Password'} name={'password'} value={loginData.password} onchange={handleLogin} />
    </div>
    <button className='common-button mt-4 align-self-center' onClick={doLogin} >Login</button>
    <p className='already-account mt-4' >Don't have an account <i onClick={()=>setBoxType('signup')}>sign up here</i> </p>
    </div>
    </>
  )
}

export default LoginPage