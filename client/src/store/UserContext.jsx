import { useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();


const UserContextProvider = (props) => {
    const [user,setUser] = useState();

    useEffect(() => {
        axios.get("/fetch").then(res => {
            if(res !== null) {
                setUser(res.data);
            }
        }).catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <UserContext.Provider value={{user,setUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;

