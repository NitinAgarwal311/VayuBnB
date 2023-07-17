import { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get("/bookings").then((response) => {
            setBookings(response.data);
        });
    }, []);

    return (
        <div>
            <AccountNav />
            {bookings.length > 0 &&
                bookings.map((booking) => {
                    return (
                        <div key={booking._id}>
                            <div>
                                <PlaceImg place={booking.place} />
                            </div>
                            <div>
                                {booking.checkIn} -&gt; {booking.checkOut}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
