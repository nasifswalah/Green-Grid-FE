import React from 'react'
import './Blocks.css'
import Search from '@assets/search-globe-svgrepo-com.svg';
import Book from '@assets/appointments-svgrepo-com.svg';
import Football from '@assets/sports-soccer-svgrepo-com.svg';

function Blocks() {
  return (
    <>
    <div className='d-flex flex-column flex-md-row justify-content-center w-100 h-50 mt-3 home-box-2' >
        <div className="d-flex flex-column  align-items-center text-break p-3 text-center">
            <img src={Search} alt="" />
            <h3>Search</h3>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis animi labore et dolore quaerat vel. </p>
        </div>

        <div className="d-flex flex-column  align-items-center text-break p-3 text-center">
            <img src={Book} alt="" />
            <h3>Book</h3>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis animi labore et dolore quaerat vel. </p>
        </div>

        <div className="d-flex flex-column  align-items-center text-break p-3 text-center">
            <img src={Football} alt="" />
            <h3>Football</h3>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis animi labore et dolore quaerat vel. </p>
        </div>
    </div>


    </>
  )
}

export default Blocks