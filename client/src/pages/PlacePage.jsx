/* eslint-disable react/jsx-no-target-blank */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        <div className="mt-8 bg-gray-100 -mx-4 px-4 py-8">
            <h1 className=" text-3xl">{place.title}</h1>
            <a
                target="_blank"
                href={"https://maps.google.com/?q=" + place.address}
                className="block my-2 font-semibold underline"
            >
                {place.address}
            </a>
            <div className="relative grid gap-2 grid-cols-[2fr_1fr]">
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
                <button className="absolute bottom-2 right-2 px-4 py-2 rounded-2xl bg-white opacity-75 shadow-lg shadow-gray-500 flex gap-1">
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
        </div>
    );
}
