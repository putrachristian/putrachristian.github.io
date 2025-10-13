import { useState, useEffect } from "react"
import apiService from "../services/api"

// Global data store - shared across all components
let globalData = {
  profile: null,
  projects: null,
  skills: null,
  workExperience: null,
}
let globalLoading = true
let globalError = null
let isDataFetched = false
let fetchPromise = null

// Function to fetch all data once
const fetchAllData = async () => {
  if (isDataFetched && !globalError) {
    return globalData
  }

  if (fetchPromise) {
    return fetchPromise
  }

  fetchPromise = (async () => {
    try {
      globalLoading = true
      globalError = null

      const apiData = await apiService.getAllData()
      globalData = apiData
      isDataFetched = true
    } catch (err) {
      console.error("Failed to fetch data:", err)
      globalError = err.message || "Failed to fetch data"

      // Fallback to static data if API fails
      try {
        const { profile, workExperience, skills } = await import(
          "../data/profile"
        )
        const { projects } = await import("../data/projects")

        globalData = {
          profile,
          projects,
          skills,
          workExperience,
        }
        isDataFetched = true
      } catch (fallbackError) {
        console.error("Failed to load fallback data:", fallbackError)
      }
    } finally {
      globalLoading = false
      fetchPromise = null
    }

    return globalData
  })()

  return fetchPromise
}

// Hook to get all data
export const useApiData = () => {
  const [data, setData] = useState(globalData)
  const [loading, setLoading] = useState(globalLoading)
  const [error, setError] = useState(globalError)

  useEffect(() => {
    const loadData = async () => {
      await fetchAllData()
      setData(globalData)
      setLoading(globalLoading)
      setError(globalError)
    }

    loadData()
  }, [])

  const refetch = async () => {
    isDataFetched = false
    fetchPromise = null
    await fetchAllData()
    setData(globalData)
    setLoading(globalLoading)
    setError(globalError)
  }

  return {
    data,
    loading,
    error,
    refetch,
  }
}

// Individual data hooks - now just return data from global store
export const useProfile = () => {
  const { data, loading, error } = useApiData()
  return {
    profile: data.profile,
    loading,
    error,
  }
}

export const useProjects = () => {
  const { data, loading, error } = useApiData()
  return {
    projects: data.projects,
    loading,
    error,
  }
}

export const useSkills = () => {
  const { data, loading, error } = useApiData()
  return {
    skills: data.skills,
    loading,
    error,
  }
}

export const useWorkExperience = () => {
  const { data, loading, error } = useApiData()
  return {
    workExperience: data.workExperience,
    loading,
    error,
  }
}
