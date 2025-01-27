import React from 'react'
import PlaceCard from './PlaceCard'

const PlacesToVisit = ({trip}) => {
  
  return (
    <div>
      <h2 className='font-bold text-lg mt-5'>Places to visit</h2>
      <div className="">
        {trip?.tripData?.itinerary?.map((item, index)=>(
          <div key={index} className="mt-5">
            <h2 className='font-medium text-lg mt-5'>Day {item.day}</h2>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
              {item?.activities?.map((place, index)=> (
              <div>
                <h2 className='font-medium text-sm text-green-500'>{item.best_time_to_visit}</h2>
                <PlaceCard place={place}/>
              </div>
            ))}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlacesToVisit
