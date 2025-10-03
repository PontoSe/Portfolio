"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavigationBarSection = ({ currentPage = "Home" }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Navigation items data - 3 left, 3 right
  const leftNavigationItems = [
    { name: "Home", href: "/", isActive: pathname === "/" },
    { name: "Portfólio", href: "/portfolio", isActive: pathname?.startsWith("/portfolio") },
    { name: "Sobre nós", href: "/sobre", isActive: pathname === "/sobre" },
  ];

  const rightNavigationItems = [
    { name: "Blog", href: "/blog", isActive: pathname === "/blog" },
    { name: "Invista aqui", href: "#", isActive: false },
    { name: "Rede", href: "#", isActive: false },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full py-2 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? '' : ''
    }`}>
      <div className="max-w-3xl mx-auto px-4">
        <div className={`relative bg-[#212121]/90 backdrop-blur-lg rounded-full px-4 md:px-5 py-2.5 shadow-lg transition-all duration-300 ${
          isScrolled ? 'shadow-2xl bg-[#212121]/95' : ''
        }`}>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <NavigationMenu className="w-full">
              <div className="flex items-center justify-between w-full">
                
                {/* Left Navigation Items */}
                <NavigationMenuList className="flex items-center gap-1">
                  {leftNavigationItems.map((item, index) => (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink
                        className={`relative px-3 py-2 rounded-full text-base font-medium transition-all duration-300 cursor-pointer group ${
                          item.isActive
                            ? "bg-[#149589] text-white shadow-lg transform scale-105"
                            : "text-[#ebe8e3] hover:bg-white/10 hover:text-white hover:transform hover:scale-105"
                        }`}
                        href={item.href}
                      >
                        {item.name}
                        
                        {/* Active indicator dot */}
                        {item.isActive && (
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                        )}
                        
                        {/* Hover effect */}
                        <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                          !item.isActive ? 'group-hover:bg-gradient-to-r group-hover:from-[#149589]/20 group-hover:to-[#5aa127]/20' : ''
                        }`}></div>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>

                {/* Center Logo */}
                <div className="absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 hover:scale-110">
                  <div className="flex items-start justify-center h-12">
                    <img
                      className="w-32 h-44 object-contain object-top filter brightness-110"
                      alt="RPV Logo"
                      src="/RPV_23_LOGO_COR (2) (3) 1.png"
                    />
                  </div>
                </div>

                {/* Right Navigation Items */}
                <NavigationMenuList className="flex items-center gap-1">
                  {rightNavigationItems.map((item, index) => (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink
                        className={`relative px-3 py-2 rounded-full text-base font-medium transition-all duration-300 cursor-pointer group ${
                          item.isActive
                            ? "bg-[#149589] text-white shadow-lg transform scale-105"
                            : "text-[#ebe8e3] hover:bg-white/10 hover:text-white hover:transform hover:scale-105"
                        }`}
                        href={item.href}
                      >
                        {item.name}
                        
                        {/* Active indicator dot */}
                        {item.isActive && (
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                        )}
                        
                        {/* Hover effect */}
                        <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                          !item.isActive ? 'group-hover:bg-gradient-to-r group-hover:from-[#149589]/20 group-hover:to-[#5aa127]/20' : ''
                        }`}></div>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </div>
            </NavigationMenu>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center justify-between">
            {/* Mobile Logo */}
            <div className="flex items-start justify-center h-10">
              <img
                className="w-20 h-12 object-contain object-top filter brightness-110"
                alt="RPV Logo"
                src="/RPV_23_LOGO_COR (2) (3) 1.png"
              />
            </div>
            
            {/* Current Page Indicator */}
            <div className="text-[#ebe8e3] text-base font-medium">
              {currentPage}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#ebe8e3] p-2 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`bg-current block transition-all duration-300 h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-0.5'}`}></span>
                <span className={`bg-current block transition-all duration-300 h-0.5 w-6 rounded-sm my-0.5 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`bg-current block transition-all duration-300 h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-0.5'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-2 bg-[#212121]/95 backdrop-blur-lg rounded-2xl p-4 shadow-2xl">
            <NavigationMenuList className="flex flex-col gap-2">
              {[...leftNavigationItems, ...rightNavigationItems].map((item, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    className={`block w-full px-4 py-3 rounded-xl text-center text-base font-medium transition-all duration-300 cursor-pointer ${
                      item.isActive
                        ? "bg-[#149589] text-white shadow-lg"
                        : "text-[#ebe8e3] hover:bg-white/10 hover:text-white"
                    }`}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavigationBarSection;
