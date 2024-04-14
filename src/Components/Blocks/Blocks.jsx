import React from 'react'
import './Blocks.css'
import Search from '@assets/search.svg';
import Book from '@assets/book.svg';
import Explore from '@assets/explore.svg';

function Blocks() {
  return (
    <>
    <div className='d-flex flex-column flex-md-row justify-content-center w-100 h-50 mt-3 home-box-2' >
        <div className="d-flex flex-column  align-items-center text-break p-3 text-center">
            <img src={Search} alt="" />
            <h3>Search</h3>
            <p>Navigate the field of playing turfs effortlessly, ensuring you find the perfect spot for your next game or practice session with ease</p>
        </div>

        <div className="d-flex flex-column  align-items-center text-break p-3 text-center">
            <img src={Book} alt="" />
            <h3>Book</h3>
            <p>Reserve your playing turf hassle-free, ensuring you secure the perfect spot for your next game or practice session effortlessly</p>
        </div>

        <div className="d-flex flex-column  align-items-center text-break p-3 text-center">
            <img src={Explore} alt="" />
            <h3>Explore</h3>
            <p>Uncover a world of playing turfs, discovering the perfect spot for your next game or practice session with just a tap</p>
        </div>
    </div>


    </>
  )
}

export default Blocks