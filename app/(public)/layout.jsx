"use client";
import { ApolloProvider } from "@apollo/client/react";
import { useState } from "react";
import {client} from "@/lib/client";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LogInPopUp from "@/components/LogInPopUp";
export default function PublicLayout({ children }) {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <ApolloProvider client={client}>
      {showLogin ? <LogInPopUp setShowLogin={setShowLogin} /> : <></>}
      <Banner />
      <Navbar setShowLogin={setShowLogin} />
      {children}
      <Footer />
    </ApolloProvider>
  );
}
