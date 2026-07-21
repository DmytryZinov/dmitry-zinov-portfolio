import { Contact } from "@/components/home/Contact";
import { Hero } from "@/components/home/Hero";
import { HomeFooter } from "@/components/home/HomeFooter";
import { MiniCards } from "@/components/home/MiniCards";
import { ProjectCards } from "@/components/home/ProjectCards";
import { DarkPageSurface } from "@/components/layout/DarkPageSurface";

export default function Home() {
  return (
    <DarkPageSurface>
      <Hero />
      <ProjectCards />
      <MiniCards />
      <Contact />
      <HomeFooter />
    </DarkPageSurface>
  );
}
