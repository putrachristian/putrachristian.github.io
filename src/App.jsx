import { LiquidBackground } from "./components/layout/LiquidBackground/LiquidBackground"
import { SideNav } from "./components/layout/SideNav/SideNav"
import { Footer } from "./components/layout/Footer/Footer"
import { Hero } from "./components/sections/Hero/Hero"
import { About } from "./components/sections/About/About"
import { Projects } from "./components/sections/Projects/Projects"
import { Skills } from "./components/sections/Skills/Skills"
import { Contact } from "./components/sections/Contact/Contact"
import { ApiProvider } from "./context/ApiContext"

const App = () => {
  return (
    <ApiProvider>
      <div className="relative bg-black min-h-screen overflow-x-hidden">
        <LiquidBackground />
        <SideNav />
        <main className="relative">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </ApiProvider>
  )
}

export default App
