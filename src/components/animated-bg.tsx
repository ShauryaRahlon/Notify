import { FlickeringGrid } from "@/components/magicui/flickering-grid";

export function FlickeringGridRoundedDemo() {
  return (
  
      <FlickeringGrid
        className="sticky  h-screen w-screen inset-0 -z-20 [mask-image:radial-gradient(850px_circle_at_center,white,transparent)]"
        squareSize={4}
        gridGap={6}
        color="#fa9f2f"
        maxOpacity={0.5}
        flickerChance={0.1}
       
      />
 
  );
}
// If that sounds exciting, please take two minutes right now to fill out this short form:

// https://forms.gle/4UY8yd2bG4dTo1qV7 . Candidates filling the form post 10PM today will be ignored for the technical task screening.

// Once you submit, we’ll email you the task brief and next-step instructions after this call so you can get started without delay.

// Looking forward to seeing your responses!