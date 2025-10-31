import { createContext, useContext, useState, useEffect, useRef } from "react"
import apiService from "../services/api"

const ApiContext = createContext(null)

export const ApiProvider = ({ children }) => {
  const [data, setData] = useState({
    profile: null,
    projects: null,
    skills: null,
    workExperience: null,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Prevent double call from React StrictMode
  const hasFetched = useRef(false)

  const fetchAllData = async () => {
    try {
      setLoading(true)
      setError(null)

      const apiData = await apiService.getAllData()
      setData(apiData)
    } catch (err) {
      console.error("Failed to fetch data:", err)
      setError(err.message || "Failed to fetch data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Skip if already fetched (prevents double call from StrictMode)
    if (hasFetched.current) return
    hasFetched.current = true

    fetchAllData()
  }, [])

  const value = {
    data,
    loading,
    error,
    refetch: fetchAllData,
    // Convenient accessors
    profile: data.profile,
    projects: data.projects,
    skills: data.skills,
    workExperience: data.workExperience,
  }

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}

export const useApiContext = () => {
  const context = useContext(ApiContext)
  if (!context) {
    throw new Error("useApiContext must be used within ApiProvider")
  }
  return context
}
