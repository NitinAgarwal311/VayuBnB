/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react'


export default function PhotoUploader({addedPhotos, onChange}) {
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

        for(const [,file] of Object.entries(files)) {
            formData.append("photos",file);
        }

        const {data} = await axios.post('/newPlace/uploadFile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        onChange([...addedPhotos, data]);
        
    }
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
    </>
  )
}
