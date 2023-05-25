import { Link, useParams } from "react-router-dom";

export default function PlacesPage() {
    const { action } = useParams();
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
                        <input type="text" placeholder="title" />
                        <h2 className="new-place">Address</h2>
                        <p className="new-place">Address of the place</p>
                        <input type="text" placeholder="title" />
                        <h2 className="new-place">Photos</h2>
                        <p className="new-place">More = Better</p>
                        <div className="flex gap-2">
                            <input type="text" placeholder="Add using a link" />
                            <button className="bg-gray-300 px-4 rounded-2xl">
                                Add&nbsp;Photo
                            </button>
                        </div>
                        <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6"></div>
                        <button className="border bg-transparent rounded-2xl p-8 text-2xl text-gray-600 flex justify-center items-center gap-1">
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
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
