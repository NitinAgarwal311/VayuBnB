import { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import { format, differenceInCalendarDays } from "date-fns";
import PlaceImg from "../components/PlaceImg";
import { Link } from "react-router-dom";

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
                        <Link
                            to={`/account/booking/${booking._id}`}
                            key={booking._id}
                            className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"
                        >
                            <div className="w-48">
                                <PlaceImg place={booking.place} />
                            </div>
                            <div className="py-3 pr-3 grow">
                                <h2 className="text-xl">
                                    {booking.place.title}
                                </h2>
                                <div className=" border-t border-gray-300 mt-2 py-2">
                                    {format(
                                        new Date(booking.checkIn),
                                        "yyyy-MM-dd"
                                    )}{" "}
                                    &rarr;{" "}
                                    {format(
                                        new Date(booking.checkOut),
                                        "yyyy-MM-dd"
                                    )}
                                </div>
                                <div className="text-xl border-t border-gray-300 py-2 flex">
                                    <div>
                                        {differenceInCalendarDays(
                                            new Date(booking.checkOut),
                                            new Date(booking.checkIn)
                                        )}{" "}
                                        nights
                                    </div>
                                    <div className="ml-2 border-l border-gray-300 pl-2">
                                        ${booking.price}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
        </div>
    );
}
