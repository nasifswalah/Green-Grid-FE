import React, { useEffect, useState } from 'react';
import './CourtDetailsBody.css';
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
import { useDispatch, useSelector } from 'react-redux';
import { showHideLoader } from '../../redux/generalSlice';

function CourtDetailsBody() {
    const { id } = useParams();
    const {user} = useSelector(store=>store.user);
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
    const [calenderOpen, setCalenderOpen] = useState(false);
    const [openSlot, setOpenSlot] = useState(false);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [filteredTimings, setFilteredTimings] = useState(TIMINGS);
    const [cost, setCost] = useState();
    const [bookingModal, setBookingModal] = useState(false);
    const [bookingDate, setBookingDate] = useState(new Date().toISOString().substr(0, 10))
    const [slotData, setSlotData] = useState([]);
    const [bookedSlots, setBookedSlots] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        getSingleCourtData()

    }, [getSingleCourtData]);

    useEffect(() => {
        getSlotsData()
    }, [bookingDate]);

    const getSingleCourtData = () => {
        AxiosInstance.get('/users/getsinglecourtdata', { params: { courtId: id } })
            .then((resp) => {
                setSingleCourtData(resp.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const getSlotsData = () => {
        dispatch(showHideLoader(true));
        AxiosInstance.get('/users/getslotsdata', { params: { courtId: id, date: bookingDate } })
            .then((resp) => {
                setSlotData(resp.data)
                dispatch(showHideLoader(false));
            })
            .catch((err) => {
                console.log(err);
                ErrorToast("Something went wrong");
                dispatch(showHideLoader(false));
            })
    }

    const selectSlot = (e, slots) => {
        e.stopPropagation()
        setSelectedSlots([...selectedSlots, slots])

        const newTimes = filteredTimings.filter((element) => element.id !== slots.id)
        setFilteredTimings(newTimes)
        setOpenSlot(false)
    }

    const handleDateSelection = () => {
        setStartingDate(new Date(dateRange.startDate).toLocaleDateString())
        setEndingDate(new Date(dateRange.endDate).toLocaleDateString())
        setCalenderOpen(false)
    }

    const cancelCalender = () => {
        setStartingDate("Start Date");
        setEndingDate("End Date");
        setCalenderOpen(false);
    }

    const createCourtSchedules = () => {
        dispatch(showHideLoader(true));
        AxiosInstance({
            url: '/admin/createschedules',
            method: 'post',
            data: {
                startDate: startingDate,
                endDate: endingDate,
                cost: cost,
                selectedSlots: selectedSlots,
                courtId: id
            }
        })
            .then((res) => {
                successToast('Court created successfully')
                setOpenTimeSlot(false);
                dispatch(showHideLoader(false));
            })
            .catch((err) => {
                console.log(err);
                ErrorToast("Court creation failed")
                dispatch(showHideLoader(false));
            })
    }

    const handleSlotSelection = (slot) => {
        if (bookedSlots.find((ele) => ele._id === slot._id)) {
            const temp = bookedSlots.filter((ele) => ele._id !== slot._id)
            setBookedSlots(temp)
        } else {
            setBookedSlots([...bookedSlots, slot])
        }
    };

    async function initiateBooking() {
        try {

            const res = await loadScript(
                "https://checkout.razorpay.com/v1/checkout.js"
            );

            if (!res) {
                ErrorToast("Razorpay SDK failed to load. Are you online?");
                return;
            }

            // creating a new order
            const slotIds = bookedSlots.map((ele) => { return ele._id })
            const result = await AxiosInstance.post("/payments/orders", { courtId: id, slotIds: slotIds });

            if (!result) {
                ErrorToast("Server error. Are you online?");
                return;
            }

            // Getting the order details back
            const { amount, id: order_id, currency, receipt } = result.data;

            const options = {
                key: process.env.REACT_APP_RP_KEY_ID,
                amount: amount.toString(),
                currency: currency,
                name: "Green Grid Sports.",
                description: "Test Transaction",
                image: null,
                order_id: order_id,
                handler: async function (response) {
                    const data = {
                        orderCreationId: order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                        receipt,
                        slotIds,
                        courtId: id,
                        date: bookingDate,
                    };

                    const result = await AxiosInstance.post("/payments/verify", data);
                    setBookingModal(false);
                    getSlotsData();

                    successToast(result.data.msg);
                },
                prefill: {
                    name: "Soumya Dey",
                    email: "SoumyaDey@example.com",
                    contact: "9999999999",
                },
                notes: {
                    address: "Soumya Dey Corporate Office",
                },
                theme: {
                    color: "#61dafb",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.log(error);
        }

    }

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    return (
        <div className='details-page' >
            <div className="details-image-box">
                <img src={`${process.env.REACT_APP_BASE_URL}/assets/${singleCourtData?.courtPics?.[0]?.name}`} alt="" className="details-main-image" />
                <div className="details-image-content d-flex justify-content-between p-4">
                    <div className="d-flex flex-column justify-content-center text-white" >
                        <h2>{singleCourtData.name}</h2>
                        <p>{singleCourtData.location}</p>
                    </div>
                    <div className="align-self-end d-flex gap-3">
                        <button><img src={bookSlotIcon} alt="" height={'20px'} onClick={() => setBookingModal(true)} /></button>
                        <button><img src={editIcon} alt="" height={'20px'} /></button>
                        <button><img src={imageIcon} alt="" height={'20px'} /></button>
                        { user.role === 1 && <button><img src={slotIcon} alt="" height={'20px'} onClick={() => { setOpenTimeSlot(true) }} /></button>}
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
                        <img src={calenderIcon} alt="" height={'20px'} onClick={() => { setCalenderOpen(true) }} />
                    </label>
                    <div className='d-flex align-items-center gap-1 mt-2 '>
                        <div className='timeslot-date flex-grow-1 border border-1  rounded p-2 text-center '>
                            {startingDate}
                        </div>
                        <img src={forwardIcon} alt="" height={'20px'} />
                        <div className='timeslot-date flex-grow-1 border border-1 rounded p-2 text-center'>
                            {endingDate}
                        </div>
                    </div>
                    {calenderOpen && <div className='calender-box'>
                        <img src={closeIcon} alt="" height={'20px'} className='modal-close-icon' onClick={() => setCalenderOpen(false)} />
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
                        <CustomInput name={'cost'} label={'Cost'} value={cost} onchange={(e) => setCost(e.target.value)} />
                    </div>
                    <div className='range-label position-relative mt-3 ' onClick={() => setOpenSlot(true)}>
                        Select slot
                        {openSlot &&
                            (<ul className='slot-list'>
                                {filteredTimings.map((slot) => (<li onClick={(e) => selectSlot(e, slot)} >{slot.name}</li>))}
                            </ul>)}
                    </div>
                    <div className='d-flex gap-2 mt-2 py-2 flex-wrap justify-content-center '>
                        {selectedSlots.map(slot => (<span className='border border-2 rounded px-2 py-1 '>{slot.name}</span>))}
                    </div>
                    <div className='d-flex justify-content-end gap-3 p-2 mt-2'>
                        <button className='common-button bg-black text-white'>Cancel</button>
                        <button className='common-button' onClick={createCourtSchedules}>Create</button>
                    </div>
                </div>
            </Modal>}

            {bookingModal && <Modal heading={'Book your slot'} closeModal={() => { setBookingModal(false) }} >
                <div className="timeslot-select-modal p-3 h-100 d-flex flex-column ">
                    <label htmlFor="" className='mt-2'>Start Date</label>
                    <input
                        type="date"
                        className='p-1 px-2 mx-2 border rounded-1'
                        value={bookingDate}
                        min={new Date().toISOString().substr(0, 10)}
                        onChange={(e) => { setBookingDate(e.target.value) }}
                    />
                    <label htmlFor="">Available Slots</label>
                    <div className='d-flex flex-wrap gap-1 mt-1'>
                        {
                            slotData.map((slot) =>
                                <span
                                    className={`${bookedSlots.find((ele) => ele._id === slot._id) 
                                        ? 'bg-info-subtle ' 
                                        : slot.bookedBy 
                                        ? 'unavailable-slots' 
                                        : 'available-slots'} 
                                        px-2 py-1 mt-2`
                                    }
                                    onClick={() => !slot.bookedBy && handleSlotSelection(slot)}>
                                    {slot.slot.name}
                                </span>
                            )
                        }
                    </div>
                    <div className='d-flex justify-content-end gap-3 p-2 mt-2'>
                        <button className='common-button bg-black text-white'>Cancel</button>
                        <button className='common-button' onClick={initiateBooking}>Book</button>
                    </div>
                </div>
            </Modal>}
        </div>
    )
}

export default CourtDetailsBody