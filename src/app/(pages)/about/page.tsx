"use client";
import BlurText from "@/components/ui/BlurText";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const testimonials = [
  {
    quote:
      "Notify is more than just a project—it's a mission to help every competitive programmer stay ahead. Building the backend for this platform has been a rewarding journey!",
    name: "Shaurya Rahlon",
    designation: "Backend Developer at Notify",
    src: "/shaurya.jpg",
  },
  {
    quote:
      "From seamless integrations to a robust full-stack architecture, Notify reflects our passion for clean code and real-world impact. Proud to be part of this team!",
    name: "Vansh Arora",
    designation: "Full Stack Developer at Notify",
    src: "/vansh.jpg",
  },
  {
    quote:
      "Designing and developing Notify's interface was all about making contest tracking effortless and beautiful. It's built by CPers, for CPers!",
    name: "Himanshu Singh",
    designation: "Full Stack Developer and UI/UX Designer at Notify",
    src: "/Himanshu.jpg",
  },
];
export default function AboutPage() {
  return (
    <>
      <div className="h-full w-full  px-2 sm:px-4 mt-28 flex flex-col items-center justify-center ">
        <BlurText text="About Us..." className="text-4xl sm:text-6xl font-bold " />
       

        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </>
  );
}
