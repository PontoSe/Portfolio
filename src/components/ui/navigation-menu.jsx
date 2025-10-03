import React from "react";
import Link from "next/link";

export const NavigationMenu = ({ children, className = "" }) => {
  return <nav className={`w-full ${className}`}>{children}</nav>;
};

export const NavigationMenuList = ({ children, className = "" }) => {
  return <ul className={`flex ${className}`}>{children}</ul>;
};

export const NavigationMenuItem = ({ children, className = "" }) => {
  return <li className={className}>{children}</li>;
};

export const NavigationMenuLink = ({ children, className = "", href = "#" }) => {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
};
