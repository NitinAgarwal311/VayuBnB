/* eslint-disable react/prop-types */
export default function PlaceImg({place, idx = 0, className = null}) {
    if (!place.photos?.length) {
        return "";
    }

    if (!className) {
        className = "object-cover";
    }

    return (
        <Image
            src={`${place.photos[idx]}`}
            className={className}
        />
    );
}
