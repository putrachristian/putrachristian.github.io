import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

import { AnimatePresence } from "framer-motion";
import { useApiContext } from "@/context/ApiContext";
import LoadingScreen from "@/components/loading-screen";

const App = () => {
  const { loading, progress } = useApiContext();

  return (
    <main className="bg-background min-h-screen">
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loading" progress={progress} />}
      </AnimatePresence>
      
      {!loading && (
        <>
          <Navbar />
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
          <Footer />
        </>
      )}
    </main>
  );
};

export default App;
