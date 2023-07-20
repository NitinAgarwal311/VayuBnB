/* eslint-disable react/jsx-no-target-blank */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";

export default function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);

    useEffect(() => {
        axios.get(`/places/${id}`).then(({ data }) => {
            setPlace(data);
        });
    }, [id]);

    if (!place) return <></>;    

    return (
        <div className="mt-8 bg-gray-100 -mx-4 px-4 pt-8">
            <h1 className=" text-3xl">{place.title}</h1>
            <a
                target="_blank"
                href={"https://maps.google.com/?q=" + place.address}
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

                {place.address}
            </a>
            <PlaceGallery place={place}/>
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] my-8 gap-8">
                <div>
                    <div>
                        <h2 className="text-2xl font-semibold">Description</h2>
                        {place.description}
                    </div>
                    <div className="mt-4">
                        Check In: {place.checkIn} <br />
                        Check Out: {place.checkOut} <br />
                        Max Guests: {place.maxGuests}
                    </div>

                </div>
                <div>
                    <BookingWidget place={place} />
                </div>
            </div>
            <div className="bg-white -mx-4 p-8">
                <h2 className="text-2xl font-semibold">Extra Info</h2>
                <p className="mb-4 mt-1 text-sm text-gray-700 leading-5">{place.extraInfo}</p>
            </div>
        </div>
    );
}
