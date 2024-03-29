import React from 'react'
import './Home.css'
import Navbar from '../../Components/Common/Navbar/Navbar'
import Carousal from '../../Components/Carousal/Carousal'
import Blocks from '../../Components/Blocks/Blocks'
import UspBlocks from '../../Components/UspBlocks/UspBlocks'

function Home() {
  return (
    <div>
        <Navbar/>
        <Carousal/>
        <Blocks/>
        <UspBlocks/>
    </div>
  )
}

export default Home