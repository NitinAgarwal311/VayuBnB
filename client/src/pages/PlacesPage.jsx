import { Link, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import NewPlaceForm from "../components/NewPlaceForm";

export default function PlacesPage() {
    const { action } = useParams();
    
    return (
        <div>
            <AccountNav />
            {!action && (
                <div className="text-center">
                    <Link
                        to="/account/places/new"
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
                <NewPlaceForm />
            )}
        </div>
    );
}
