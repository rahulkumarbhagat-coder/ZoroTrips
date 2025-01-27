import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";


const Header = () => {

  const [openDialouge, setOpenDialouge] = useState(false);
  const [user, setUser] = useState()

  //for google sign dialouge box
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => getUserProfile(codeResponse),
    onError: (codeError) => console.log(codeError)
  })

  const getUserProfile = async(tokenInfo) =>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers:{
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((res)=>{
      localStorage.setItem('user', JSON.stringify(res.data))
      setOpenDialouge(false)
      window.location.reload()
    }).catch((error)=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem("user")))
  },[])
  

  return (
    <div className="p-3 px-5 shadow-sm flex justify-between items-center">
      <div className="w-[120px] h-16 flex items-center">
        <a href="/"><img className=" mx-3 mt-5 object-cover" src="./zoroLogo.png" alt="logo" /></a>
        </div>
      <div className="">
        {user ? (
          <div
            className="flex items-center
         gap-5"
          >
            <a href="/create-trip">
              <Button variants="outline" className="rounded-full">
              + Create Trip
            </Button>
            </a>

            <a href="/myTrips">
              <Button variants="outline" className="rounded-full">
              My Trips
            </Button>
            </a>
            
            <Popover>
              <PopoverTrigger><img
              src={user?.picture}
              alt="user"
              className="h-[40px] w-[40px] object-contain rounded-full"
            /></PopoverTrigger>
              <PopoverContent>
                <h2 className="cursor-pointer" onClick={()=>{
                  googleLogout()
                  localStorage.clear()
                  window.location.reload()
                }}>Logout</h2>
              </PopoverContent>
            </Popover>

            
          </div>
        ) : (
          
          <Button onClick={()=>setOpenDialouge(true)}>Sign in</Button>
        )}
      </div>
      <Dialog open={openDialouge}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="flex gap-2">
                <img className="size-44" src="zoroLost.png" alt="" />
                <div className="">
                  <h2 className="font-bold text-2xl mt-6">Sign In With Google</h2>
                  <p>Sign in to the App with Google authentication securly</p>
                  <Button onClick={login} className='w-full my-5'><FcGoogle className="h-9 w-9"/>Sign In With Google</Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
