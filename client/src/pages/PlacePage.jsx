/* eslint-disable react/jsx-no-target-blank */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    useEffect(() => {
        axios.get(`/places/${id}`).then(({ data }) => {
            setPlace(data);
        });
    }, [id]);

    if (!place) return <></>;

    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-black min-h-full">
                <button
                    className="fixed right-20 top-7 px-4 py-2 rounded-2xl text-white flex gap-1 shadow-gray-400 shadow-md"
                    onClick={() => {
                        setShowAllPhotos(false);
                    }}
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
                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                    </svg>
                    Close photos
                </button>
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text-center text-3xl font-serif text-white">
                            Photos of {place.title}
                        </h2>
                    </div>
                    {place.photos.length > 0 &&
                        place.photos.map((photo) => {
                            return (
                                <img
                                    className="object-cover m-auto"
                                    key={photo}
                                    src={
                                        "http://localhost:4000/uploads/" + photo
                                    }
                                />
                            );
                        })}
                </div>
            </div>
        );
    }

    return (
        <div className="mt-8 bg-gray-100 -mx-4 px-4 py-8">
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
            <div className="relative grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                <div>
                    {place.photos?.[0] && (
                        <div>
                            <img
                                src={
                                    "http://localhost:4000/uploads/" +
                                    place.photos[0]
                                }
                                className="aspect-square object-cover"
                            ></img>
                        </div>
                    )}
                </div>
                <div className="grid">
                    {place.photos?.[1] && (
                        <img
                            src={
                                "http://localhost:4000/uploads/" +
                                place.photos[1]
                            }
                            className="aspect-square object-cover"
                        ></img>
                    )}
                    <div className="overflow-hidden">
                        {place.photos?.[2] && (
                            <img
                                src={
                                    "http://localhost:4000/uploads/" +
                                    place.photos[2]
                                }
                                className="aspect-square object-cover relative top-2"
                            ></img>
                        )}
                    </div>
                </div>
                <button
                    className="absolute bottom-2 right-2 px-4 py-2 rounded-2xl bg-white opacity-75 shadow-lg shadow-gray-500 flex gap-1"
                    onClick={() => {
                        setShowAllPhotos(true);
                    }}
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
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                    </svg>
                    Show All Photos
                </button>
            </div>
            <div className="my-4">
                <h2 className="text-2xl font-semibold">Description</h2>
                {place.description}
            </div>
            <div className="grid grid-cols-2">
                <div>
                    Check In: {place.checkIn} <br/>
                    Check Out: {place.checkOut} <br/>
                    Max Guests: {place.maxGuests}
                </div>
                <div>
                    <div className="bg-white shadow-md p-4 rounded-2xl">
                        <h2 className="text-2xl text-center">Price: ${place.price}</h2>
                        <div className="border rounded-2xl flex justify-around ">
                            <div className="py-3 px-4">
                                <label>Check In: </label>
                                <input type="date" name="" id="" />
                            </div>
                            <div className="py-3 px-4 border-l-2">
                                <label>Check Out: </label>
                                <input type="date" name="" id="" />
                            </div>

                        </div>
                        <button className="primary">Book this place</button>
                    </div>

                </div>

            </div>
        </div>
    );
}
