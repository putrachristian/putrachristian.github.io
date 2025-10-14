const API_BASE_URL = "https://creative-talent-9ac1291f94.strapiapp.com/api";

class ApiService {
	constructor() {
		this.baseURL = API_BASE_URL;
	}

	async request(endpoint, options = {}) {
		const url = `${this.baseURL}${endpoint}`;
		const config = {
			headers: {
				"Content-Type": "application/json",
				...options.headers,
			},
			...options,
		};

		try {
			const response = await fetch(url, config);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error(`API request failed for ${endpoint}:`, error);
			throw error;
		}
	}

	// Profile endpoints
	async getProfile() {
		return this.request("/profile");
	}

	async getProjects() {
		return this.request("/projects?populate=*");
	}

	async getSkills() {
		return this.request("/skill");
	}

	async getWorkExperience() {
		return this.request("/work-experiences?populate=*");
	}

	// Get all data at once
	async getAllData() {
		try {
			const [profile, projects, skills, workExperience] = await Promise.all([
				this.getProfile(),
				this.getProjects(),
				this.getSkills(),
				this.getWorkExperience(),
			]);

			return {
				profile: profile.data || profile,
				projects: projects.data || projects,
				skills: skills.data || skills,
				workExperience: workExperience.data || workExperience,
			};
		} catch (error) {
			console.error("Failed to fetch all data:", error);
			throw error;
		}
	}
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
