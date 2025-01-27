import { db } from '@/AiService/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import InfoSection from '../sections/InfoSection'
import Hotels from '../sections/Hotels'
import PlacesToVisit from '../sections/PlacesToVisit'
import Footer from '../sections/Footer'

const viewTrip = () => {
    const {tripId} = useParams()
    const [trip, setTrip] = useState([])

    //get data from firebase database
    const getTripData = async() =>{
        const docRef = doc(db, 'AITrips', tripId)
        const docSnap = await getDoc(docRef)

        if (docSnap) {
            setTrip(docSnap.data())
        }
        else{
            console.log('no doc found');
            toast('No trip found!')
        }
    }

    useEffect(()=>{
        tripId && getTripData()
    },[tripId])
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* Information   */}
      <InfoSection trip={trip}/>
      
      {/* Hotels */}
      <Hotels trip={trip}/>

      {/* Places to visit there */}
      <PlacesToVisit trip={trip}/>

      {/* footer */}
      <Footer trip={trip}/>
    </div>
  )
}

export default viewTrip
