/* eslint-disable react/prop-types */
export default function PlaceImg({place, idx = 0, className = null}) {
    if (!place.photos?.length) {
        return "";
    }

    if (!className) {
        className = "object-cover";
    }

    return (
        <img
            src={`http://localhost:4000/uploads/${place.photos[idx]}`}
            className={className}
        />
    );
}
