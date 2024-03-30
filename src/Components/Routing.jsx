import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from '../Pages/AuthPage/AuthPage';
import Home from '../Pages/Home/Home';
import NewCourt from '../Pages/NewCourt/NewCourt';

function Routing() {
  return (
    <Routes>
        <Route path='/' element={<AuthPage/>} />
        <Route path='/home' element={<Home/>} />
        
        
        
        <Route path='/newCourt' element={<NewCourt/>} />
    </Routes>
  )
}

export default Routing;