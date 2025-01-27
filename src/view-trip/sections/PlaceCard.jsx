import { getPlaceDetails, PhotoRefUrl } from '@/AiService/GlobalApi'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PlaceCard = ({place}) => {

  const [photoUrl, setPhotoUrl] = useState()
      
        useEffect(()=>{
          place && getPlacePhoto()
        },[place])
      
        const getPlacePhoto = async() =>{
          try {
            const res = await getPlaceDetails(place.place_name)
            const photoUrl = PhotoRefUrl.replace('{referenceId}', res.data.results[0].photos[0].photo_reference)
            setPhotoUrl(photoUrl)
          } catch (error) {
            console.log(error);
            
          }
          
        }

  return (
    <Link to={"https://www.google.com/maps/search/?api=1&query="+place?.place_name} target="_blank">
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
      <img src={photoUrl?photoUrl:'/zoroLost.png'} alt="image" className='w-[120px] h-[120px] rounded-xl object-cover'/>
      <div>
        <h2 className="font-bold text-lg">{place.place_name}</h2>
        <p className='text-sm text-gray-500'>{place.place_details}</p>
        <h2 className='mt-2 text-xs'>🕙 {place.time_to_travel}</h2>
      </div>
    </div>
    </Link>
    
  )
}

export default PlaceCard
