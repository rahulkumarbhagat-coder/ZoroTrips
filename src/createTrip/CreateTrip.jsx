import { chatSession } from "@/AiService/AIModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOption,
  SelectTravelList,
} from "@/constants/options";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/AiService/firebaseConfig";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [place, setPlace] = useState("");
  const [prediction, setPrediction] = useState([]);
  const [showPrediction, setShowPrediction] = useState(true);
  const [formData, setFormData] = useState([]);
  const [openDialouge, setOpenDialouge] = useState(false);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  //autocomplete for location input
  const autoComplete = async () => {
    if (place) {
      const response = await fetch(
        `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${place}&key=${
          import.meta.env.VITE_GO_MAP_PRO_API
        }`
      );
      const data = await response.json();
      setPrediction(data.predictions);
    }
  };


  //save data into form as the input changes
  const handleChange = (name, value) => {
    setFormData((prevFromData) =>({
      ...prevFromData,
      [name]: value,
    }));
  };

 

  //calling autocomplete
  useEffect(() => {
    if (place) {
      autoComplete();
    }
  }, [place]);

  //on clicking Generate Trip button
  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialouge(true);
      return;
    }
    if (
      formData.totalDays > 10 ||
      !formData.location ||
      !formData.totalDays ||
      !formData.budget ||
      !formData.traveller
    ) {
      toast("Please fill all details");
      return;
    }

    setLoading(true)

    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.totalDays)
      .replace("{budget}", formData?.budget)
      .replace("{traveller}", formData?.traveller)
      .replace("{totalDays}", formData?.totalDays);


    const result = await chatSession.sendMessage(FINAL_PROMPT);
    setLoading(false)
    saveData(result?.response?.text())
  };

  //Saving trip data in database
  const saveData = async(tripData) =>{
    setLoading(true)
    const user = JSON.parse(localStorage.getItem('user'))
    const docId = Date.now().toString()
    await setDoc(doc(db, "AITrips", docId), {
      userSelection : formData,
      tripData : JSON.parse(tripData),
      userEmail : user?.email,
      id : docId
    });
    setLoading(false)
    navigate(`/viewTrip/${docId}`)  
  }

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
      onGenerateTrip()
    }).catch((error)=>{
      console.log(error);
      
    })
  }

  return (
    <div className="sm:px-30 md:px-60 lg:px-90 xl:px-30 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences⛷️🛫
      </h2>
      <p className="text-gray-500 mt-3 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-10 flex flex-col gap-9">
        <div className="">
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          <Input
            type="text"
            value={place}
            onChange={(e) => {
              setPlace(e.target.value), handleChange("location", place);
            }}
          />
          {prediction?.length > 0 &&
            showPrediction &&
            prediction.map(
              (item) =>
                place.length > 0 && (
                  <div
                    onClick={() => {
                      setPlace(item.description);
                      handleChange("location", item.description);
                      setShowPrediction(false);
                    }}
                    key={item.place_id}
                    className="w-[60vw] pl-3 pr-10 py-1 border-2 border-t-0 border-grey-900 cursor-pointer"
                  >
                    {item.description}
                  </div>
                )
            )}
        </div>
        <div className="">
          <h2 className="text-xl my-3 font-medium">
            How many days are you palnning your trip?
          </h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            onChange={(e) => handleChange("totalDays", parseInt(e.target.value))}
          />
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOption.map((item, index) => (
            <div
              onClick={() => handleChange("budget", item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                formData.budget === item.title && "border-black shadow-lg"
              }`}
              key={index}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">
          Who do you plan to travelling with your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelList.map((item, index) => (
            <div
              onClick={() => handleChange("traveller", item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                formData.traveller === item.people && "border-black shadow-lg"
              }`}
              key={index}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 flex justify-end">
        <Button disabled={loading} onClick={onGenerateTrip}>{loading?<AiOutlineLoading3Quarters className="w-7 h-7 animate-spin"/>:'Generate Trip'}</Button>
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

export default CreateTrip;
