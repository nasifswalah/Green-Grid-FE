import React from 'react'
import Navbar from '../../Components/Common/Navbar/Navbar'
import CourtListBody from '../../Components/CourtListBody/CourtListBody'

function CourtListPage() {
  return (
    <div className='d-flex flex-column vh-100'>
        <Navbar/>
        <CourtListBody/>
    </div>
  )
}

export default CourtListPage