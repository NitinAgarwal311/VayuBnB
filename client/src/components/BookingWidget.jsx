/* eslint-disable react/prop-types */

export default function BookingWidget({place}) {
  return (
    <div className="bg-white shadow-md p-4 rounded-2xl">
            <h2 className="text-2xl text-center mb-2">
                Price: ${place.price}
            </h2>
            <div className="border rounded-2xl ">
                <div className="flex justify-around">
                    <div className="py-3 px-4 mb-2">
                        <label>Check In: </label>
                        <input
                            type="date"
                            className="border rounded-md p-1"
                        />
                    </div>
                    <div className="py-3 px-4 border-l-2">
                        <label>Check Out: </label>
                        <input
                            type="date"
                            className="border rounded-md p-1"
                        />
                    </div>
                </div>
                <div className="border-t-2 p-4">
                    <label>Number of Guests</label>
                    <input type="number" name="" id="" />
                </div>
            </div>
            <button className="primary">Book this place</button>
    </div>
  )
}
