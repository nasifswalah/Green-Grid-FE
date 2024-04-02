import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from '../Pages/AuthPage/AuthPage';
import Home from '../Pages/Home/Home';
import NewCourt from '../Pages/NewCourt/NewCourt';
import CourtListPage from '../Pages/CourtListPage/CourtListPage';
import CourtDetailsPage from '../Pages/CourtDetailsPage/CourtDetailsPage';

function Routing() {
  return (
    <Routes>
        <Route path='/' element={<AuthPage/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/courts' >
          <Route path='courtslist' element={<CourtListPage/>} />
          <Route path='courtsdetails/:id' element={<CourtDetailsPage/>} />
        </Route>
  
        <Route path='/newCourt' element={<NewCourt/>} />
    </Routes>
  )
}

export default Routing;