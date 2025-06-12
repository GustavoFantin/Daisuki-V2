'use client'

import { Toaster } from "react-hot-toast"
import Background from "../about/Background"
import ContactForm from "./ContactForm"
import { useState } from "react";
import Header from "@/components/Header";
import BurgerMenu from "@/components/BurgerMenu";

const page = () => {  
  const [menuOpen, setMenuOpen] = useState(false);

  return (
  <>
    <Header setMenuOpen={setMenuOpen} />
    <BurgerMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    <Toaster />
    <Background />
    <ContactForm />
  </>
  )
}

export default page