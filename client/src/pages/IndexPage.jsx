import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../components/Image";

export default function IndexPage() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get("/places/all").then((response) => {
            setPlaces(response.data);
        });
    }, []);

    return (
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
            {places.length > 0 &&
                places.map((place) => {
                    return (
                        <Link
                            to={`/place/${place._id}`}
                            key={place._id}
                            className=""
                        >
                            {place.photos.length > 0 && (
                                <div className=" bg-gray-400 flex mb-2 rounded-2xl">
                                    <Image
                                        src={place.photos[0]}
                                        alt="Place's Image"
                                        className="rounded-2xl object-cover aspect-square"
                                    />
                                </div>
                            )}
                            <h3 className="font-bold">{place.address}</h3>
                            <h2 className="text-sm">{place.title}</h2>
                            <h3 className="mt-1">
                                <span className=" font-bold">
                                    ${place.price}
                                </span>{" "}
                                per night
                            </h3>
                        </Link>
                    );
                })}
        </div>
    );
}
