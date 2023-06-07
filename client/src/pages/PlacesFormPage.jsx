import { useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import NewPlaceForm from "../components/NewPlaceForm";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PlacesFormPage() {
    const [place,setPlace] = useState(null);
    
    const {id} = useParams();

    useEffect(() => {
        if(id !== undefined) {
            axios.get(`/places/${id}`).then(result => {
                setPlace(result.data);
            })
        }
    }, [id]);


    return (
        <>
            <AccountNav />
            <NewPlaceForm place={place}/>
        </>
    );
}
