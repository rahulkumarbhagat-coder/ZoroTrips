import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex flex-col item-center mx-56 gap-9'>
      <h1 className='font-extrabold text-[40px] text-center mt-16'><span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips</h1>
      <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating customize itineraries tailored to your interests and budget.</p>
      <Link className='self-center' to={'/create-trip'}><Button>Get started, it's free</Button></Link>
      
    </div>
  )
}

export default Hero
