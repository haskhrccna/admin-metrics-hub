import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProjectImages from "@/components/ProjectImages";
import Certifications from "@/components/Certifications";

const Index = () => {
  return (
    <div className="h-screen bg-slate-900 flex flex-col overflow-hidden">
      <ScrollArea className="flex-1">
        <Hero />
        <Timeline />
        <Certifications />
        <Skills />
        <ProjectImages />
      </ScrollArea>
      <Footer />
    </div>
  );
};

export default Index;