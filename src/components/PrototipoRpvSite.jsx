import React from "react";
import { AboutUsSection } from "./AboutUsSection";
import CoursesSection from "./CoursesSection";
import { FooterSection } from "./FooterSection";
import HomeSection from "./HomeSection";
import { NavigationBarSection } from "./NavigationBarSection";
import OpenClassesSection from "./OpenClassesSection";

export default function PrototipoRpvSite() {
  return (
    <div className="bg-[#ebe8e3] min-h-screen w-full overflow-x-hidden" style={{ overscrollBehavior: 'none' }}>
      <div className="bg-[#ebe8e3] w-full overflow-hidden relative">
        <NavigationBarSection currentPage="Home" />

        <div className="w-full">
          <HomeSection />
        </div>

        <div className="w-full px-4 py-8">
          <AboutUsSection />
        </div>

        <div className="w-full px-4 py-8">
          <OpenClassesSection />
        </div>

        <div className="w-full px-4 py-8">
          <CoursesSection />
        </div>

        <div className="w-full px-4 py-8">
          <FooterSection />
        </div>
      </div>
    </div>
  );
}
