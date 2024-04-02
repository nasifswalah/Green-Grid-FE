import React, { useEffect, useState } from 'react'
import Cards from '../Cards/Cards'
import AxiosInstance from '../../Config/apicall'

function CourtListBody() {
const [courtData, setCourtData] = useState([]);

  useEffect(()=>{
    getAllCoutData()
  },[])

  const getAllCoutData = ()=>{
    AxiosInstance.get('/users/getallcourtdata')
    .then((resp)=>{
      setCourtData(resp.data)
    })
    .catch((err)=>{
      console.log(err);
      ErrorToast("Something went wrong")
    })
  }
  
  return (
    <div className='court-list-body flex-grow-1 d-flex flex-wrap justify-content-center overflow-y-auto gap-3 mt-3' >
        {courtData.map((court)=><Cards court={court}/>)}
    </div>
  )
}

export default CourtListBody