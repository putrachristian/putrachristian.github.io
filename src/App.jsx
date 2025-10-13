import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Projects from "./pages/Projects"
import About from "./pages/About"
import { useApiData } from "./hooks/useApiData"
import "./App.scss"

function App() {
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
    </Router>
  )
}

export default App
