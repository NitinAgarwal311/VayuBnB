/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import Image from "./Image";

export default function PhotoUploader({ addedPhotos, onChange }) {
    const [photoLink, setPhotoLink] = useState("");

    const addPhotoByLink = async (ev) => {
        ev.preventDefault();
        const { data } = await axios.post("/newPlace/upload-by-link", {
            link: photoLink,
        });

        onChange([...addedPhotos, data]);

        setPhotoLink("");
    };

    const uploadPhotoFiles = async (ev) => {
        ev.preventDefault();
        const files = ev.target.files;
        console.log(files);

        const formData = new FormData();

        for (const [, file] of Object.entries(files)) {
            formData.append("photos", file);
        }

        const { data } = await axios.post("/newPlace/uploadFile", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        onChange([...addedPhotos, ...data]);
    };

    const removePhoto = (ev, photo) => {
        ev.preventDefault();
        onChange([...addedPhotos.filter((addedPhoto) => addedPhoto !== photo)]);
    };

    const selectAsMainPhoto = (ev, photo) => {
        ev.preventDefault();

        onChange([photo, ...addedPhotos.filter(addedPhoto => addedPhoto !== photo)]);
    };

    return (
        <>
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
                {addedPhotos.length >0 && addedPhotos.map((link) => {
                    return (
                        <div key={link} className="flex relative">
                            <Image
                                src={link}
                                alt=""
                                className="rounded-2xl w-full object-cover"
                            />
                            <button
                                className="cursor-pointer absolute bottom-1 right-1 text-white bg-black py-2 px-4 bg-opacity-30 rounded-2xl"
                                onClick={(ev) => {
                                    removePhoto(ev, link);
                                }}
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
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                </svg>
                            </button>
                            <button
                                className="cursor-pointer absolute bottom-1 left-1 text-white bg-black py-2 px-4 bg-opacity-30 rounded-2xl"
                                onClick={(ev) => {
                                    selectAsMainPhoto(ev, link);
                                }}
                                disabled={link === addedPhotos[0]}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill={link === addedPhotos[0] ? "currentColor": "none"}
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                    />
                                </svg>
                            </button>
                        </div>
                    );
                })}
                <label className="border cursor-pointer bg-transparent rounded-2xl p-8 text-2xl text-gray-600 flex justify-center items-center gap-1">
                    <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={uploadPhotoFiles}
                    />
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
        </>
    );
}
