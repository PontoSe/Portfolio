import { Card, CardContent } from "@/components/ui/card";
import { ChevronUp } from "@/components/ui/icons";
import React from "react";

export const AboutUsSection = ({ className = "" }) => {
  // Images data for the carousel
  const images = [
    {
      src: "/image.png",
      alt: "Group of technology students and professionals",
    },
    {
      src: "/image-1.png",
      alt: "Technology workshop session",
    },
    {
      src: "/image-2.png",
      alt: "Technology presentation event",
    },
    {
      src: "/image 2.png",
      alt: "Technology training classroom",
    },
  ];

  return (
    <section className={`w-full py-12 relative ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <Card className="w-full rounded-3xl bg-gradient-to-r from-gray-800 to-gray-900 border-none overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col lg:flex-row gap-8 mb-12">
              <div className="flex-none">
                <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tight">
                  <span className="font-light text-white">Sobre </span>
                  <span className="font-extrabold text-[#5aa127]">nós</span>
                </h2>
              </div>

              <div className="flex-1">
                <p className="text-white text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-left lg:text-right">
                  O projeto visa formar profissionais da tecnologia na zona da
                  mata mineira com o intuito de criar um ecossistema de inovação
                  através do estabelecimento de um parque tecnológico na zona da
                  mata.
                </p>
              </div>
            </div>

            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
              <ChevronUp className="text-white w-8 h-8" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {images.map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutUsSection;
