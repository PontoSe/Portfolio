"use client";

import React from "react";
import NavigationBarSection from "@/components/NavigationBarSection";
import { AboutUsSection } from "@/components/AboutUsSection";

export default function SobrePage() {
  return (
    <div className="bg-[#0b0b0b] text-white w-[100vw] h-[100vh] overflow-hidden">
      <NavigationBarSection currentPage="Sobre nós" />
      <main className="pt-20 h-[calc(100vh-80px)] w-full flex items-center justify-center">
        <div className="w-full max-w-6xl px-6">
          {/* Reuse the existing section but constrain height to avoid overflow */}
          <div className="scale-[0.98] origin-center">
            <AboutUsSection />
          </div>
        </div>
      </main>
    </div>
  );
}
