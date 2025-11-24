const API_BASE_URL = "https://creative-talent-9ac1291f94.strapiapp.com/api"

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error)
      throw error
    }
  }

  // Profile endpoints
  async getProfile() {
    return this.request("/profile")
  }

  async getProjects() {
    return this.request("/projects?populate=*")
  }

  async getSkills() {
    return this.request("/skill")
  }

  async getWorkExperience() {
    return this.request("/work-experiences?populate=*")
  }

  // Helper function to extract Strapi data
  extractData(response) {
    // Handle Strapi v4 format: { data: ... } or { data: { attributes: ... } }
    if (response && response.data !== undefined) {
      // If data is an array (collection type)
      if (Array.isArray(response.data)) {
        return response.data.map((item) => ({
          id: item.id,
          ...(item.attributes || item),
        }))
      }
      // If data is an object (single type or single item)
      if (response.data && response.data.attributes) {
        return {
          id: response.data.id,
          ...response.data.attributes,
        }
      }
      // If data is already flattened
      return response.data
    }
    // If no data wrapper, return as is
    return response
  }


}

// Create and export a singleton instance
const apiService = new ApiService()
export default apiService

