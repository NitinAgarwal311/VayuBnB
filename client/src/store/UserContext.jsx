/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();


const UserContextProvider = (props) => {
    const [user,setUser] = useState();
    const [ready,setReady] = useState(false);

    useEffect(() => {
        axios.get("/users/fetch").then(res => {
            if(res !== null) {
                setUser(res.data);
                setReady(true);
            }
        }).catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <UserContext.Provider value={{user,setUser,ready}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;

