import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "@/components/ui/icons";
import React from "react";

export default function CoursesSection() {
  // Course data for mapping
  const courseYears = [
    { year: "2022", active: true },
    { year: "2023", active: true },
    { year: "2024", active: true },
    { year: "2025", active: false },
  ];

  const courseTracks = [
    { name: "Auxiliar\nde SOC", active: true },
    { name: "Inteligência\nArtificial", active: true },
    { name: "Infraestrutura", active: true },
  ];

  return (
    <section className="w-full py-16 bg-[#d8d5d0] rounded-3xl relative">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl mb-16">
          <span className="text-[#212121] font-normal">
            Nossos{" "}
          </span>
          <span className="text-[#5aa127] font-extrabold">
            cursos
          </span>
        </h2>

        <div className="flex justify-center">
          <Card className="bg-transparent border-none shadow-none">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row gap-12 relative items-center">
                {/* Left side - Development track with years */}
                <div className="flex flex-col items-center lg:items-end">
                  <div className="text-center lg:text-right text-[#212121] text-xl md:text-2xl lg:text-3xl leading-tight mb-8">
                    Desenvolvimento
                    <br />
                    de sistemas
                  </div>

                  <div className="relative flex flex-col gap-6 items-center lg:items-end">
                    {/* Course node for Development */}
                    <div className="w-16 h-16 bg-[#d8d5d0] rounded-full border-4 border-[#54c45e] relative">
                      <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 hidden lg:block">
                        <ArrowRight className="text-[#212121] w-4 h-4" />
                      </div>
                    </div>

                    {/* Year nodes */}
                    {courseYears.map((year, index) => (
                      <div
                        key={`year-${year.year}`}
                        className="flex flex-col lg:flex-row items-center gap-4"
                      >
                        <div className="text-center lg:text-right text-[#212121] text-lg md:text-xl lg:text-2xl lg:mr-4">
                          Turma {year.year}
                        </div>
                        <div
                          className={`w-16 h-16 bg-[#d8d5d0] rounded-full border-4 ${
                            year.active
                              ? "border-[#54c45e]"
                              : "border-[#272727]"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right side - Course tracks */}
                <div className="flex flex-col md:flex-row gap-8 mt-8 lg:mt-0 lg:ml-8">
                  {courseTracks.map((track, index) => (
                    <div
                      key={`track-${index}`}
                      className="flex flex-col items-center"
                    >
                      <div className="w-16 h-16 bg-[#d8d5d0] rounded-full border-4 border-[#54c45e] mb-4" />
                      <div className="text-[#212121] text-lg md:text-xl lg:text-2xl text-center whitespace-pre-line">
                        {track.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
