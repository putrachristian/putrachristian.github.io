import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Projects from "./pages/Projects"
import About from "./pages/About"
// import PerformanceMonitor from "./components/PerformanceMonitor"
import { useApiData } from "./hooks/useApiData"
import "./App.scss"

const App = () => {
  // Initialize data fetching at app level
  useApiData()

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
      {/* <PerformanceMonitor /> */}
    </Router>
  )
}

export default App
