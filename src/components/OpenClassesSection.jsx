import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "@/components/ui/icons";
import React from "react";

export default function OpenClassesSection() {
  // Course data for mapping
  const courses = [
    {
      id: 1,
      title: (
        <>
          Desenvolvimento
          <br />
          de <span className="font-semibold text-[#5aa127]">Sistemas</span>
        </>
      ),
      image: "/image 3.png",
    },
    {
      id: 2,
      title: (
        <>
          Especialista em{" "}
          <span className="font-semibold text-[#5aa127]">SOC</span>
        </>
      ),
      image: "/image 4.png",
    },
    {
      id: 3,
      title: (
        <>
          Inteligência{" "}
          <span className="font-semibold text-[#5aa127]">Artificial</span>
        </>
      ),
      image: "/47fe4b0 1.png",
    },
  ];

  return (
    <section className="w-full py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal mb-12">
          <span className="text-[#212121]">Turmas </span>
          <span className="font-extrabold text-[#5aa127]">
            abertas
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="relative w-full h-96 shadow-lg overflow-hidden rounded-lg"
            >
              <CardContent className="p-0">
                <div className="p-6 pb-0">
                  <div className="h-20 font-light text-xl leading-tight text-[#212121]">
                    {course.title}
                  </div>
                </div>

                <Separator className="h-0.5 w-full mt-4" />

                <div className="relative h-64">
                  {/* Course image */}
                  <img
                    src={course.image}
                    alt={`Course ${course.id}`}
                    className="absolute bottom-0 w-full h-48 object-cover"
                  />

                  {/* Action button */}
                  <Button
                    className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-[#5aa127] hover:bg-[#4c8921] p-0"
                    aria-label="View course details"
                  >
                    <ArrowRight className="w-6 h-6 text-white" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
