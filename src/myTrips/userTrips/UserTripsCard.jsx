import { getPlaceDetails, PhotoRefUrl } from '@/AiService/GlobalApi'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const UserTripsCard = ({trip}) => {

     const [photoUrl, setPhotoUrl] = useState()
    
      useEffect(()=>{
        trip && getPlacePhoto()
      },[trip])
    
      const getPlacePhoto = async() =>{
        try {
          const res = await getPlaceDetails(trip?.userSelection?.location)
          console.log(res.data);
          const photoUrl = PhotoRefUrl.replace('{referenceId}', res.data.results[0].photos[0].photo_reference)
          setPhotoUrl(photoUrl)
        } catch (error) {
          console.log(error);
          
        }
        
      }

  return (
    <Link to={'/viewTrip/'+trip?.id}>
    <div className='hover:scale-105 transition-all'>
      <img src={photoUrl? photoUrl:"/zoroLost.png"} alt="" className='object-cover rounded-xl h-[220px] w-full'/>
      <div className="">
        <h2 className='font-bold text-lg'>{trip?.userSelection?.location}</h2>
        <h2 className='text-gray-500 text-sm'>{trip?.userSelection?.totalDays} days trip with {trip?.userSelection?.budget} budget</h2>
      </div>
    </div>
    </Link>
    
  )
}

export default UserTripsCard
