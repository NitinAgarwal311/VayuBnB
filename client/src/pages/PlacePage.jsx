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
            <div className="grid gap-2 grid-cols-[2fr_1fr]">
                <div>
                    {place.photos?.[0] && (
                        <div>
                            <img
                                src={
                                    "http://localhost:4000/uploads/" +
                                    place.photos[0]
                                }
                                className="w-full aspect-square object-cover"
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
                    <div>
                        {place.photos?.[2] && (
                            <img
                                src={
                                    "http://localhost:4000/uploads/" +
                                    place.photos[2]
                                }
                                className="aspect-square object-cover"
                            ></img>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
