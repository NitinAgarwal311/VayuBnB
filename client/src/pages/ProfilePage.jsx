import { useContext } from "react";
import { UserContext } from "../store/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AccountNav from "../components/AccountNav";

export default function ProfilePage() {
    const { user, ready, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    let { subPath } = useParams();

    if (subPath === undefined) {
        subPath = "profile";
    }

    const logout = async () => {
        await axios.post("/users/logout");
        setUser(null);
        navigate("/");
    };

    if (!ready) {
        return <div>Loading...</div>;
    }

    if (ready && !user) {
        navigate("/login");
    }

    return (
        <>
            <AccountNav />
            <div className="max-w-lg text-center mx-auto">
                {user.name}&apos;s Profile. Logged in as {user.email}
                <button onClick={logout} className="primary">
                    Logout
                </button>
            </div>
        </>
    );
}
