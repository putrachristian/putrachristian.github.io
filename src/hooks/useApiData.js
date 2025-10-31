import { useApiContext } from "../context/ApiContext"

// Hook to get all data
export const useApiData = () => {
  const context = useApiContext()
  return {
    data: context.data,
    loading: context.loading,
    error: context.error,
    refetch: context.refetch,
  }
}

// Individual data hooks - simplified
export const useProfile = () => {
  const { profile } = useApiContext()
  return { profile }
}

export const useProjects = () => {
  const { projects } = useApiContext()
  return { projects }
}

export const useSkills = () => {
  const { skills } = useApiContext()
  return { skills }
}

export const useWorkExperience = () => {
  const { workExperience } = useApiContext()
  return { workExperience }
}
