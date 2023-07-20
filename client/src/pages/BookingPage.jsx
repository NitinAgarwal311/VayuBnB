/* eslint-disable react/jsx-no-target-blank */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceGallery from "../components/PlaceGallery";
import { format } from "date-fns";

export default function BookingPage() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        axios.get("/bookings").then((response) => {
            const bookingInfo = response.data.find(({ _id }) => _id === id);

            if (bookingInfo) {
                setBooking(bookingInfo);
            }
        });
    }, [id]);

    if (!booking) {
        return "";
    }

    return (
        <div className="mt-4">
            <h1 className=" text-3xl">{booking.place.title}</h1>
            <a
                target="_blank"
                href={"https://maps.google.com/?q=" + booking.place.address}
                className="my-2 font-semibold underline flex gap-1 mb-4"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                </svg>

                {booking.place.address}
            </a>
            <div className="bg-gray-200 p-4 mb-4 rounded-2xl flex justify-between">
                <div>
                    <h2 className="text-xl">Booking Details</h2>
                    <div className="mt-2 py-2">
                        {format(new Date(booking.checkIn), "yyyy-MM-dd")} &rarr;{" "}
                        {format(new Date(booking.checkOut), "yyyy-MM-dd")}
                    </div>
                </div>
                <div>
                  <h2 className="text-xl">Total Price</h2>
                  <h2 className="text-xl font-semibold">${booking.price}</h2>
                </div>
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    );
}
