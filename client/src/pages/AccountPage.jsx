import { useContext } from "react";
import { UserContext } from "../store/UserContext";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function AccountPage() {
    const { user, ready } = useContext(UserContext);
    const navigate = useNavigate();

    let { subPath } = useParams();

    if (subPath === undefined) {
        subPath = "profile";
    }

    console.log(subPath);

    if (!ready) {
        return <div>Loading...</div>;
    }

    if (ready && !user) {
        navigate("/login");
    }

    const getLinkClasses = (type) => {
        let classes = "px-4 py-2";
        if (type === subPath) {
            classes = classes + " bg-primary rounded-xl text-white";
        }

        return classes;
    };

    return (
        <>
            <nav className="w-full flex justify-center my-6 gap-8">
                <Link to="/account" className={getLinkClasses("profile")}>
                    My Profile
                </Link>
                <Link
                    to="/account/bookings"
                    className={getLinkClasses("bookings")}
                >
                    My Bookings
                </Link>
                <Link
                    to="/account/accomodations"
                    className={getLinkClasses("accomodations")}
                >
                    My Accomodations
                </Link>
            </nav>

            {subPath === "profile" && <div className="text-center text-2xl">{user.name}&apos;s Profile. Logged in as {user.email}</div>}
        </>
    );
}
