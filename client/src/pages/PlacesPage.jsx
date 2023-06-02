import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Perks from "./Perks";
import PhotoUploader from "../components/PhotoUploader";
import axios from "axios";

export default function PlacesPage() {
    const { action } = useParams();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState("");
    // const navigate = useNavigate();

    const newPlaceHandler = (ev) => {
        ev.preventDefault();

        const { data } = axios.post("/newPlace", {
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
        });

        console.log(data);

        // navigate("/account/accomodations");
    };

    return (
        <div>
            {!action && (
                <div className="text-center">
                    <Link
                        to="/account/accomodations/new"
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
            )}
            {action === "new" && (
                <div>
                    <form onSubmit={newPlaceHandler}>
                        <h2 className="new-place">Title</h2>
                        <p className="new-place">
                            Title for your place, keep it short and catchy
                        </p>
                        <input
                            type="text"
                            value={title}
                            onChange={(ev) => setTitle(ev.target.value)}
                            placeholder="title"
                        />
                        <h2 className="new-place">Address</h2>
                        <p className="new-place">Address of the place</p>
                        <input
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(ev) => setAddress(ev.target.setAddress)}
                        />
                        <h2 className="new-place">Photos</h2>
                        <p className="new-place">More = Better</p>
                        <PhotoUploader
                            addedPhotos={addedPhotos}
                            onChange={setAddedPhotos}
                        />
                        <h2 className="new-place">Description</h2>
                        <p className="new-place">description of your place</p>
                        <textarea
                            value={description}
                            onChange={(ev) => setDescription(ev.target.value)}
                        />
                        <h2 className="new-place">Perks</h2>
                        <p className="new-place">
                            select all the perks of your place
                        </p>
                        <Perks selected={perks} onChange={setPerks} />
                        <h2 className="new-place">Extra Info</h2>
                        <p className="new-place">house rules, etc</p>
                        <textarea
                            value={extraInfo}
                            onChange={(ev) => setExtraInfo(ev.target.value)}
                        />
                        <h2 className="new-place">Check In & Check Out</h2>
                        <p>add check in and check out</p>
                        <div className="grid sm:grid-cols-3 gap-2">
                            <div>
                                <h3 className="mt-2 -mb-1">Check In Time</h3>
                                <input
                                    type="text"
                                    placeholder="14"
                                    value={checkIn}
                                    onChange={(ev) =>
                                        setCheckIn(ev.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check Out Time</h3>
                                <input
                                    type="text"
                                    placeholder="11"
                                    value={checkOut}
                                    onChange={(ev) =>
                                        setCheckOut(ev.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Max Guests</h3>
                                <input
                                    type="number"
                                    placeholder="1"
                                    value={maxGuests}
                                    onChange={(ev) =>
                                        setMaxGuests(ev.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="primary">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
