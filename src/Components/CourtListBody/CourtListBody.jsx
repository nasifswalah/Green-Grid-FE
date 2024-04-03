import React, { useEffect, useState } from 'react'
import Cards from '../Cards/Cards'
import AxiosInstance from '../../Config/apicall'
import { ErrorToast } from '../../Plugins/Toast/Toast';

function CourtListBody() {
const [courtData, setCourtData] = useState([]);

  useEffect(()=>{
    getAllCourtData()
  },[])

  const getAllCourtData = ()=>{
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
        {courtData.map((court,index)=><Cards court={court} key={index}/>)}
    </div>
  )
}

export default CourtListBody