import React, { useRef, useState } from 'react'
import './NewCourtBox.css';
import CustomInput from '../Common/CustomInput/CustomInput';
import addIcon from '@assets/addicon.svg';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AxiosInstance from '../../Config/apicall';
import { ErrorToast, successToast } from '../../Plugins/Toast/Toast';
import { useNavigate } from 'react-router-dom';

function NewCourtBox() {
  const [courtData, setCourtData] = useState({});
  const fileInputRef = useRef();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCourtData({ ...courtData, [e.target.name]: e.target.value })
  }

  const handleInputFileChange = (e)=>{
    const files = Array.from(e.target.files)
    const validFiles = files.filter((file)=>{return file.type.startsWith('image/') || file.type.startsWith('video/')})

    setSelectedFiles(prevState=>[...prevState,...validFiles])
  }

  const handleAddIconClick = ()=>{
    fileInputRef.current.click()
  };

  const handleDescriptionChange = (data)=>{
    setCourtData({...courtData,description:data});
  };

  const handleCreateCourt = ()=>{
    const formDatatoSend = new FormData()
    selectedFiles.forEach((file)=>{
      formDatatoSend.append('files', file)
    });

    Object.entries(courtData).forEach(([key, value])=>{
      formDatatoSend.append(key,value)
    });

    AxiosInstance({
      url:'/admin/createnewcourt',
      method:'post',
      data:formDatatoSend,
      headers:{
        'Content-Type':'multipart/form-data'
      }
    })
    .then((res)=>{
      successToast('New court added successfully');
      navigate('/home');
    })
    .catch((err)=>{
      ErrorToast('Something went wrong')
    })
  }

  return (
    <div className='container-fluid'>
      <div className="row ">
        <div className='d-flex justify-content-between gap-m px-3 mt-3' >
          <h3>Add New Court</h3>
          <span className='d-flex gap-3'>
            <button className='common-button bg-black text-white'>
              {" "}
              Cancel
            </button>
            <div className="common-button" onClick={handleCreateCourt}>Create</div>
          </span>
        </div>
        <div className='col-lg-4 col-md-6 mt-3'>
          <CustomInput type={'text'} name={'name'} label={'Name'} value={courtData.name} onchange={handleChange} />
        </div>

        <div className='col-lg-4 col-md-6 mt-3'>
          <CustomInput type={'text'} name={'location'} label={'Location'} value={courtData.location} onchange={handleChange} />
        </div>

        <div className='col-lg-4 col-md-6 mt-3'>
          <CustomInput type={'text'} name={'type'} label={'Type'} value={courtData.type} onchange={handleChange} />
        </div>

        <div className='col-lg-4 col-md-6 mt-3'>
          <CustomInput type={'text'} name={'address1'} label={'Address line 1'} value={courtData.address1} onchange={handleChange} />
        </div>

        <div className='col-lg-4 col-md-6 mt-3'>
          <CustomInput type={'text'} name={'address2'} label={'Address line 2'} value={courtData.address2} onchange={handleChange} />
        </div>

        <div className='col-lg-4 col-md-6 mt-3'>
          <CustomInput type={'text'} name={'address3'} label={'Address line 3'} value={courtData.address3} onchange={handleChange} />
        </div>

        <div className='col-lg-4 col-md-6 mt-3'>
          <CustomInput type={'text'} name={'landMark'} label={'Land Mark'} value={courtData.landMark} onchange={handleChange} />
        </div>

        <div className='col-lg-4 col-md-6 mt-3'>
          <CustomInput type={'number'} name={'pin'} label={'Pin Code'} value={courtData.pinCode} onchange={handleChange} />
        </div>

        <div className='col-lg-4 col-md-6 mt-3'>
          <CustomInput type={'number'} name={'contactNumber'} label={'Contact Number'} value={courtData.contactNumber} onchange={handleChange} />
        </div>

        <div className="mt-3 d-flex flex-wrap gap-2">
          {selectedFiles.map((file,index)=>(
            <>
              {file.type.startsWith('image/') && (<img src={URL.createObjectURL(file)} height={150} alt='' key={index}/>)}
              {file.type.startsWith('video/') && (<video src={URL.createObjectURL(file)} height={150} key={index}/>)}
            </>
            ))}

          <div>
          <input 
            type="file" 
            ref={fileInputRef}  
            onChange={handleInputFileChange}
            multiple
            accept="image/*, video/*"
            style={{display:"none"}}
          />

          <img src={addIcon} alt="" width={"150px"} height={"150px"} onClick={handleAddIconClick} />
          </div>
        </div>
        <div className=' pb-2 mt-3'>
         <ReactQuill className='w-100 mb-5 ' style={{height:'200px'}} theme="snow" value={courtData.description} onChange={handleDescriptionChange} />
         </div>
      </div>
    </div>
  )
}

export default NewCourtBox