import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "./Perks";
import axios from "axios";

export default function PlacesPage() {
    const { action } = useParams();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [addedPhotos, setAddPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState("");
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState("");

    const addPhotoByLink = async (ev) => {
        ev.preventDefault();
        const { data } = await axios.post("/newPage/upload-by-link", {
            link: photoLink,
        });

        setAddPhotos((prev) => {
            return [...prev, data];
        });

        setPhotoLink("");
    };

    const uploadPhotoFiles = async (ev) => {
        ev.preventDefault();
        const files = ev.target.files;
        console.log(files);

        const formData = new FormData();

        for(const [,file] of Object.entries(files)) {
            formData.append("photos",file);
        }

        const {data} = await axios.post('/newPage/uploadFile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        setAddPhotos(prev => {
            return [...prev, ...data];
        });
        
    }

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
                    <form>
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
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Add using a link"
                                value={photoLink}
                                onChange={(ev) => setPhotoLink(ev.target.value)}
                            />
                            <button
                                className="bg-gray-300 px-4 rounded-2xl"
                                onClick={addPhotoByLink}
                            >
                                Add&nbsp;Photo
                            </button>
                        </div>
                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedPhotos.map((photo) => {
                                return (
                                    <div key={photo} className="flex w-full object-cover">
                                        <img
                                            src={`http://localhost:4000/uploads/${photo}`}
                                            alt=""
                                            className="rounded-2xl"
                                        />
                                    </div>
                                );
                            })}
                            <label className="border cursor-pointer bg-transparent rounded-2xl p-8 text-2xl text-gray-600 flex justify-center items-center gap-1">
                                <input type="file" multiple className="hidden" onChange={uploadPhotoFiles}/>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-8 h-8"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                    />
                                </svg>
                                Upload
                            </label>
                        </div>
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
