import React from 'react';
import './Navbar.css';  
import brandImg from '../../../Assets/running.png'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const {user} = useSelector(store=>store.user);
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <span className="navbar-brand">Green Gr<img src={brandImg} alt="" />d</span>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav me-auto mb-lg-0">
          <li className="nav-item" onClick={()=>navigate('/home')}>
            Home
          </li>
          { user.role === 1 && <li className="nav-item" onClick={()=>navigate('/newCourt')} >
            Add new court
          </li>}
          <li className="nav-item" onClick={()=>navigate('/courts/courtslist')}>
            Courts
          </li>
        </ul>
        <div className="nav-item dropdown ">
          <span className="nav-link dropdown-toggle user-menu"  id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {user.firstName}
          </span>
          <ul className="dropdown-menu dropdown-menu-end " aria-labelledby="navbarDropdownMenuLink">
            <li><span className="dropdown-item" >Profile</span></li>
            <li><span className="dropdown-item" >Log out</span></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Navbar