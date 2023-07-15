import { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import axios from "axios";

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
                            {booking.checkIn} -&gt; {booking.checkOut}
                        </div>
                    );
                })}
        </div>
    );
}
