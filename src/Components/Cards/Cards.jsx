import React from 'react';
import './Cards.css';
import { useNavigate } from 'react-router-dom';


function Cards({court}) {
    const navigate = useNavigate();
    return (
    <div className='card' onClick={()=>{navigate('/courts/courtsdetails/'+court._id)}} >
        <img src={`${process.env.REACT_APP_BASE_URL}/assets/${court?.courtPics?.[0]?.name}`} alt="" />
        <div className="card-container">
            <h2>{court.name}</h2>
            <p>{court.location}<br/>
            {court.type}
            </p>
        </div>
    </div>
  )
}

export default Cards