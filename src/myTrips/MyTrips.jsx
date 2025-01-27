import { db } from '@/AiService/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserTripsCard from './userTrips/UserTripsCard'

const MyTrips = () => {

  const navigate = useNavigate()
  const [userTrips, setUserTrips] = useState([])
  
  const getUserTrips = async() =>{
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user) {
      navigate('/')
      return
    }
    
    const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email))
    const querySnapshot = await getDocs(q)

    //to learn why to clear userTrips
    setUserTrips([])
    querySnapshot.forEach((doc)=>{
      setUserTrips(prev=>[...prev, doc.data()])
    })
    console.log(userTrips);
    
  }

  useEffect(()=>{
    getUserTrips()
  },[])
  return (
    <div className='sm:px-30 md:px-60 lg:px-90 xl:px-30 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>MyTrips</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10">
        {userTrips.length>0?userTrips?.map((trip, index)=>{
        return <UserTripsCard key={index} trip={trip}/>
      }):
      <div>
        {[1,2,3,4,5,6].map((item, index) =>{
          return <div className="h-[220px] w-full bg-slate-200 animate-pulse rounded-lg" key={index}></div>
        })}
      </div>
      }
      </div>
    </div>
  )
}

export default MyTrips
