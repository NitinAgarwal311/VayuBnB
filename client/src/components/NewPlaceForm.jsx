/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Perks from "./Perks";
import PhotoUploader from "./PhotoUploader";

export default function NewPlaceForm({place}) {
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState("");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if(place) {
            setTitle(place.title);
            setAddress(place.address);
            setAddedPhotos(place.photos);
            setDescription(place.description);
            setPerks(place.perks);
            setExtraInfo(place.extraInfo);
            setCheckIn(place.checkIn);
            setCheckOut(place.checkOut);
            setMaxGuests(place.maxGuests);
            setPrice(place.price);
        }
    }, [place])

    const newPlaceHandler = (ev) => {
        ev.preventDefault();

        const placeData = {
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price
        };

        if(!place) {
            axios.post("/newPlace", placeData);
        }
        else {
            axios.put(`/places/${place._id}`, placeData);
        }
        
        navigate("/account/places");
    };


    return (
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
                onChange={(ev) => setAddress(ev.target.value)}
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
            <p className="new-place">select all the perks of your place</p>
            <Perks selected={perks} onChange={setPerks} />
            <h2 className="new-place">Extra Info</h2>
            <p className="new-place">house rules, etc</p>
            <textarea
                value={extraInfo}
                onChange={(ev) => setExtraInfo(ev.target.value)}
            />
            <h2 className="new-place">Check In & Check Out</h2>
            <p>add check in and check out</p>
            <div className="grid sm:grid-cols-4 gap-2">
                <div>
                    <h3 className="mt-2 -mb-1">Check In Time</h3>
                    <input
                        type="text"
                        placeholder="14"
                        value={checkIn}
                        onChange={(ev) => setCheckIn(ev.target.value)}
                    />
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">Check Out Time</h3>
                    <input
                        type="text"
                        placeholder="11"
                        value={checkOut}
                        onChange={(ev) => setCheckOut(ev.target.value)}
                    />
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">Max Guests</h3>
                    <input
                        type="number"
                        placeholder="1"
                        value={maxGuests}
                        onChange={(ev) => setMaxGuests(ev.target.value)}
                    />
                </div>
                <div>
                    <h3 className="mt-2 -mb-1">Price Per Night</h3>
                    <input
                        type="number"
                        placeholder="1"
                        value={price}
                        onChange={(ev) => setPrice(ev.target.value)}
                    />
                </div>
            </div>
            <div>
                <button type="submit" className="primary">
                    Save
                </button>
            </div>
        </form>
    );
}
