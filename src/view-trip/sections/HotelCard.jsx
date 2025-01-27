import { getPlaceDetails, PhotoRefUrl } from '@/AiService/GlobalApi'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HotelCard = ({hotel, index}) => {
    
    const [photoUrl, setPhotoUrl] = useState()
    
      useEffect(()=>{
        hotel && getPlacePhoto()
      },[hotel])
    
      const getPlacePhoto = async() =>{
        try {
          const res = await getPlaceDetails(hotel?.hotel_name)
          const photoUrl = PhotoRefUrl.replace('{referenceId}', res.data.results[0].photos[0].photo_reference)
          setPhotoUrl(photoUrl)
        } catch (error) {
          console.log(error);
          
        }
        
      }

  return (
    <div key={index}>
      <Link to={"https://www.google.com/maps/search/?api=1&query="+hotel?.hotel_name + ","  + hotel?.hotel_address} target="_blank">
            <div
              className="hover:scale-105 transition-all cursor-pointer my-5"
            >
              <img src={photoUrl?photoUrl:'/zoroLost.png'} alt="image" className="rounded-xl h-[200px] w-full object-cover" />
              <div className="my-2 flex flex-col gap-3">
                <h2 className="font-medium">{hotel?.hotel_name}</h2>
                <h2 className="font-xs text-gray-500">
                  📍{hotel?.hotel_address}
                </h2>
                <h2 className="font-sm">💰{hotel?.price}</h2>
                <h2 className="font-sm">✨{hotel?.ratings}</h2>
              </div>
            </div>
          </Link>
    </div>
  )
}

export default HotelCard
