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
      // Data remains null/empty if API fails
      isDataFetched = true
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

// Individual data hooks - simplified
export const useProfile = () => {
  const { data } = useApiData()
  return { profile: data.profile }
}

export const useProjects = () => {
  const { data } = useApiData()
  return { projects: data.projects }
}

export const useSkills = () => {
  const { data } = useApiData()
  return { skills: data.skills }
}

export const useWorkExperience = () => {
  const { data } = useApiData()
  return { workExperience: data.workExperience }
}
