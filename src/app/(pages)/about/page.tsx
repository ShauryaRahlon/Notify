"use client";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import ShinyText from "@/src/components/ui/ShinyText/ShinyText";
const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Shaurya Rahlon",
      designation: "Product Manager at TechFlow",
      src: "/shaurya.jpg",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Vansh Arora",
      designation: "CTO at InnovateSphere",
      src: "vansh.jpg",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Himanshu Singh",
      designation: "Operations Director at CloudScale",
      src: "/Himanshu.jpg",
    },
    
  ];
export default function AboutPage() {
  return (
    <>
    <div className="container mx-auto px-2 sm:px-4 py-28 space-y-10  flex flex-col items-center ">
     <ShinyText text="About Us" disabled={false} speed={5} className='custom-class text-4xl  mb-6 text-center text-gray-900 dark:text-gray-300 ' />
    
     <AnimatedTestimonials testimonials={testimonials} />
    </div>
    </>
  );
}
