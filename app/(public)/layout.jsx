'use client'
import {useState} from "react";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LogInPopUp from "@/components/LogInPopUp";
export default function PublicLayout({ children }) {
      const [showLogin, setShowLogin] = useState(false);
    return (
        <>
            {showLogin ? <LogInPopUp setShowLogin={setShowLogin} /> : <></>}
            <Banner />
            <Navbar setShowLogin={setShowLogin} />
            {children}
            <Footer />
        </>
    );
}
