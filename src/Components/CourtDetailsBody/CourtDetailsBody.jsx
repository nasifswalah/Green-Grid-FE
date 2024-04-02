import React, { useEffect, useState } from 'react';
import './CourtDetailsBody.css';
import courtImg from '@assets/throwing-basketball.jpg'
import editIcon from '@assets/editIcon.svg';
import imageIcon from '@assets/imageIcon.svg';
import slotIcon from '@assets/addIcon3.svg';
import bookSlotIcon from '@assets/bookingIcon.svg'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Modal from '../Common/Modal/Modal';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import calenderIcon from '@assets/calender.svg';
import closeIcon from '@assets/close.svg';
import forwardIcon from '@assets/forward.svg'
import CustomInput from '../Common/CustomInput/CustomInput';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../../Config/apicall';
import { TIMINGS } from '../../Constants/timings';
import { ErrorToast, successToast } from '../../Plugins/Toast/Toast';
import { useDispatch } from 'react-redux';
import { showHideLoader } from '../../redux/generalSlice';

function CourtDetailsBody() {
    const {id} = useParams();
    const [openTimeSlot, setOpenTimeSlot] = useState(false);
    const [dateRange, setDateRange] = useState(
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    );
    const [startingDate, setStartingDate] = useState("Start Date");
    const [endingDate, setEndingDate] = useState("End Date");

    const [singleCourtData, setSingleCourtData] = useState({});
    useEffect(()=>{
        getSingleCourtData()
    },[])

    const getSingleCourtData=()=>{
        AxiosInstance.get('/users/getsinglecourtdata', {params:{courtId:id}})
        .then((resp)=>{
            setSingleCourtData(resp.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    const [calenderOpen, setCalenderOpen] = useState(false);
    const [openSlot, setOpenSlot] = useState(false);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [filteredTimings, setFilteredTimings] = useState(TIMINGS);
    const [cost, setCost] = useState();
    const dispatch = useDispatch();

    const selectSlot = (e,slots)=>{
        e.stopPropagation()
        setSelectedSlots([...selectedSlots,slots])
        const newTimes = filteredTimings.filter(element=>element.id!==slots.id)
        setFilteredTimings(newTimes)
        setOpenSlot(false)
    }

    const handleDateSelection = ()=>{
        setStartingDate(new Date(dateRange.startDate).toLocaleDateString())
        setEndingDate(new Date(dateRange.endDate).toLocaleDateString())
        setCalenderOpen(false)
    }

    const cancelCalender = ()=>{
        setStartingDate("Start Date");
        setEndingDate("End Date");
        setCalenderOpen(false);
    }

    const createCourtSchedules = ()=>{
        dispatch(showHideLoader(true));
        AxiosInstance({
            url:'/admin/createschedules',
            method:'post',
            data:{
                startDate:startingDate,
                endDate:endingDate,
                cost:cost,
                selectedSlots:selectedSlots,
                courtId:id
            }
        })
        .then((res)=>{
            successToast('Court created successfully')
            setOpenTimeSlot(false);
            dispatch(showHideLoader(false));
        })
        .catch((err)=>{
            console.log(err);
            ErrorToast("Court creation failed")
            dispatch(showHideLoader(false));
        })
    }
 
    return (
        <div className='details-page' >
            <div className="details-image-box">
                <img src={courtImg} alt="" className="details-main-image" />
                <div className="details-image-content d-flex justify-content-between p-4">
                    <div className="d-flex flex-column justify-content-center text-white" >
                        <h2>{singleCourtData.name}</h2>
                        <p>{singleCourtData.location}</p>
                    </div>
                    <div className="align-self-end d-flex gap-3">
                        <button><img src={bookSlotIcon} alt="" height={'20px'} /></button>
                        <button><img src={editIcon} alt="" height={'20px'} /></button>
                        <button><img src={imageIcon} alt="" height={'20px'} /></button>
                        <button><img src={slotIcon} alt="" height={'20px'} onClick={() => { setOpenTimeSlot(true) }} /></button>
                    </div>
                </div>
            </div>
            <ReactQuill readOnly={true}
                theme='bubble'
                className=''
                value={singleCourtData.description}
            />
            {openTimeSlot && <Modal heading={'Add new time slot data'} closeModal={() => { setOpenTimeSlot(false) }} >
                <div className="timeslot-select-modal p-3">
                    <label htmlFor="">Select Date Range
                        <img src={calenderIcon} alt="" height={'20px'} onClick={()=>setCalenderOpen(true)} />
                    </label>
                    <div className='d-flex align-items-center gap-1 mt-2 '>
                        <div className='timeslot-date flex-grow-1 border border-1  rounded p-2 text-center '>
                            {startingDate}
                        </div>
                        <img src={forwardIcon} alt="" height={'20px'}/>
                        <div className='timeslot-date flex-grow-1 border border-1 rounded p-2 text-center'>
                            {endingDate}
                        </div>
                    </div>
                    { calenderOpen && <div className='calender-box'>
                    <img src={closeIcon} alt="" height={'20px'} className='modal-close-icon' onClick={()=>setCalenderOpen(false)} />
                        <DateRange
                            editableDateInputs={true}
                            onChange={item => setDateRange(item.selection)}
                            moveRangeOnFirstSelection={false}
                            ranges={[dateRange]}
                        />
                        <div className='d-flex justify-content-end gap-3 p-2 mt-2'>
                            <button className='common-button bg-black text-white' onClick={cancelCalender}>Cancel</button>
                            <button className='common-button' onClick={handleDateSelection}>Select</button>
                        </div>
                    </div>}
                    <div className="mt-3">
                        <CustomInput name={'cost'} label={'Cost'} value={cost} onchange={(e)=>setCost(e.target.value)} />
                    </div>
                    <div className='range-label position-relative mt-3 ' onClick={()=>setOpenSlot(true)}>
                        Select slot
                        {openSlot && <ul className='slot-list'> 
                        {filteredTimings.map((slot)=><li onClick={(e)=>selectSlot(e,slot)} >{slot.name}</li>)}
                        </ul>}
                    </div>
                    <div className='d-flex gap-2 mt-2 py-2 flex-wrap justify-content-center '>
                        {selectedSlots.map(slot=><span className='border border-2 rounded px-2 py-1 '>{slot.name}</span> )}
                    </div>
                    <div className='d-flex justify-content-end gap-3 p-2 mt-2'>
                            <button className='common-button bg-black text-white'>Cancel</button>
                            <button className='common-button' onClick={createCourtSchedules}>Create</button>
                        </div>
                </div>
            </Modal>}
        </div>
    )
}

export default CourtDetailsBody