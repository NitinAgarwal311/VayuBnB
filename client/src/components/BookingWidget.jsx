/* eslint-disable react/prop-types */

import { useState } from "react";
import {differenceInCalendarDays} from "date-fns"

export default function BookingWidget({ place }) {
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');

    let numberOfNights = 0;

    if(checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }



    return (
        <div className="bg-white shadow-md p-4 rounded-2xl">
            <h2 className="text-2xl text-center mb-2">
                Price: ${place.price} / per night
            </h2>
            <div className="border rounded-2xl ">
                <div className="flex justify-around">
                    <div className="py-3 px-4 mb-2">
                        <label>Check In: </label>
                        <input type="date" className="border rounded-md p-1" value={checkIn} onChange={(ev) => {setCheckIn(ev.target.value)}}/>
                    </div>
                    <div className="py-3 px-4 border-l-2">
                        <label>Check Out: </label>
                        <input type="date" className="border rounded-md p-1" value={checkOut} onChange={(ev) => {setCheckOut(ev.target.value)}}/>
                    </div>
                </div>
                <div className="border-t-2 p-4">
                    <label>Number of Guests</label>
                    <input type="number" value={numberOfGuests} onChange={(ev) => {setNumberOfGuests(ev.target.value)}} />
                </div>
                <div className="border-t-2 p-4">
                    <label>Name</label>
                    <input type="text" value={name} onChange={(ev) => {setName(ev.target.value)}} />
                    <label>Mobile Number</label>
                    <input type="tel" value={mobileNumber} onChange={(ev) => {setMobileNumber(ev.target.value)}} />
                </div>
            </div>
            <button className="primary">Book this place {numberOfNights > 0 && <span>${numberOfNights*place.price}</span>}</button>
        </div>
    );
}
