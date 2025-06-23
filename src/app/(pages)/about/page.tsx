"use client";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import ShinyText from "@/components/ui/ShinyText";
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
    src: "vansh.jpg",
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
      <div className="container mx-auto px-2 sm:px-4 py-28 space-y-10  flex flex-col items-center ">
        <ShinyText
          text="About Us"
          disabled={false}
          speed={5}
          className="custom-class text-4xl  mb-6 text-center text-gray-900 dark:text-gray-300 "
        />

        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </>
  );
}
