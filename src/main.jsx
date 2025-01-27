import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateTrip from "./createTrip/CreateTrip";
import Header from "./components/custom/Header";
import { Toaster } from "./components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./view-trip/[tripId]/ViewTrip";
import MyTrips from "./myTrips/MyTrips";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/viewTrip/:tripId" element={<ViewTrip/>} />
          <Route path="/myTrips" element={<MyTrips/>} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
