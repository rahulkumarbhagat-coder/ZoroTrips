import { getPlaceDetails, PhotoRefUrl } from '@/AiService/GlobalApi';
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";


const InfoSection = ({trip}) => {

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
    <div>
      <img src={photoUrl} alt="image" className='h-[270px] w-full object-cover rounded-xl'/>
      <div className="flex items-center justify-between">
        <div className="flex flex-col my-5 gap-2">
        <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>
        <div className="flex gap-5">
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-600 text-lg sm:text-xs'>📆{trip?.userSelection?.totalDays} Days</h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-600 text-lg sm:text-xs'>💰{trip?.userSelection?.budget} Budget</h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-600 text-lg sm:text-xs'>👦No. of traveller: {trip?.userSelection?.traveller}</h2>
        </div>
      </div>
      <Button><IoIosSend />
      </Button>
      </div>
      
    </div>
  )
}

export default InfoSection
