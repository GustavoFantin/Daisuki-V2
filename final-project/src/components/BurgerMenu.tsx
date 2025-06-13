'use client'

import { slide as Menu } from "react-burger-menu";
import './BurgerMenu.css'
import Link from "next/link";

export default function BurgerMenu({menuOpen, setMenuOpen}: {menuOpen: boolean, setMenuOpen: (isOpen: boolean) => void}) {
  const handleClickSection = () => {
    setMenuOpen(false);
  }

  return (
    <Menu 
      isOpen={menuOpen} 
      onStateChange={({ isOpen }: {isOpen: boolean}) => setMenuOpen(isOpen)}
      customBurgerIcon={false} 
      right
    >
        <Link 
              href="/service-list"
              className="text-black! hover:text-pink-600 transition duration-300"
              aria-label="services page"
          >
            Services
          </Link>
          <Link 
              href="/about"
              className="text-black! hover:text-pink-600 transition duration-300"
              aria-label="About page"
          >
            About Us
          </Link>
          <Link 
              href="/contact-us"
              className="text-black! hover:text-pink-600 transition duration-300"
              aria-label="Contact page"
          >
            Contact
          </Link>
    </Menu>
  );
};
