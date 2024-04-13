import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "../components/Image";

export default function PlacesPage() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get("/places").then(({ data }) => {
            setPlaces(data);
        });
    }, []);

    return (
        <div>
            <AccountNav />
            <>
                <div className="text-center">
                    <Link
                        to="/account/places/new"
                        className="bg-primary inline-flex rounded-full px-6 py-2 gap-1 text-white"
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
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                        New Place
                    </Link>
                </div>
                <div>
                    {places.length > 0 &&
                        places.map((place) => {
                            return (
                                <Link
                                    to={`/account/places/${place._id}`}
                                    className="flex bg-gray-200 p-4 rounded-xl mt-4"
                                    key={place._id}
                                >
                                    <div>
                                        {place.photos.length > 0 && (
                                            <Image
                                                src={`${place.photos[0]}`}
                                                className="h-32 w-32 mr-4 rounded-lg grow shrink-0"
                                            />
                                        )}
                                    </div>
                                    <div className="grow-0 shrink">
                                        <div className="text-xl">
                                            {place.title}
                                        </div>
                                        <p className="text-sm mt-2">
                                            {" "}
                                            {place.description}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                </div>
            </>
        </div>
    );
}
