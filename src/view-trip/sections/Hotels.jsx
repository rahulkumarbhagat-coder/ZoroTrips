import React from "react";
import HotelCard from "./HotelCard";

const Hotels = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5">
        {trip?.tripData?.hotel_options?.map((hotel, index) => (
          <HotelCard hotel={hotel} index={index}/>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
