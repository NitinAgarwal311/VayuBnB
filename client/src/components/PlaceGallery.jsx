/* eslint-disable react/prop-types */
import { useState } from "react";
import Image from "./Image";

export default function PlaceGallery({ place }) {
    const [showAllPhotos, setShowAllPhotos] = useState(false);

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
                                <Image
                                    className="object-cover m-auto"
                                    key={photo}
                                    src={photo}
                                />
                            );
                        })}
                </div>
            </div>
        );
    }

    return (
        <div className="relative grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
            <div>
                {place.photos?.[0] && (
                    <div>
                        <Image
                            src={place.photos[0]}
                            className="aspect-square object-cover"
                            onClick={() => {
                                setShowAllPhotos(true);
                            }}
                        />
                    </div>
                )}
            </div>
            <div className="grid">
                {place.photos?.[1] && (
                    <img
                        src={place.photos[1]}
                        className="aspect-square object-cover"
                        onClick={() => {
                            setShowAllPhotos(true);
                        }}
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
                            onClick={() => {
                                setShowAllPhotos(true);
                            }}
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
    );
}
