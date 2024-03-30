import React, { useState } from 'react';
import './AuthPage.css';
import authImage from '@assets/basketball-net-from-below.jpg';
import LoginPage from '../../Components/AuthBox/LoginBox';
import SignupPage from '../../Components/AuthBox/SignupBox';

function AuthPage() {
    const [boxType, setBoxType] = useState('login');

  return (
    <div className='container-fluid d-flex justify-content-center align-items-center vh-100 vw-100 authPage'  >
        
        <div className="row">

            <div className="col-md-6 left-image" style={{backgroundImage:`url(${authImage})`}}>
                <p>Reserve your spot, create memories, let the game begin</p>
               
            </div>

            <div className="col-md-6 right-side"  >
                <h3 className="w-100 text-center mt-4 mb-4 ">
                    {
                        boxType === 'login' ? 'Login' : 'Signup'
                    }
                </h3>
                {
                    boxType === 'login' ? <LoginPage setBoxType={setBoxType}/> : <SignupPage setBoxType={setBoxType}/>
                }
            </div>

        </div>


    </div>
  )
}

export default AuthPage