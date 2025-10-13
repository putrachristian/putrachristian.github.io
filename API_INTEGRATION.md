# API Integration Documentation

This portfolio now fetches data from a Strapi CMS API instead of using static data files.

## API Endpoints

- **Base URL**: `https://creative-talent-9ac1291f94.strapiapp.com/api`
- **Profile**: `/profile`
- **Projects**: `/projects`
- **Skills**: `/skills`
- **Work Experience**: `/work-experiences`

## Implementation Details

### 1. API Service (`src/services/api.js`)

- Centralized API service with error handling
- Supports both individual endpoint calls and bulk data fetching
- Automatic fallback to static data if API fails

### 2. Single Data Fetch Strategy (`src/hooks/useApiData.js`)

- **Single API Call**: All data is fetched once at app startup
- **Global Data Store**: Shared data across all components
- **No Redundant Calls**: Each component accesses the same cached data
- **Individual Hooks**: `useProfile()`, `useProjects()`, `useSkills()`, `useWorkExperience()` all use the same cached data
- **Caching**: Data is cached and reused across component re-renders

### 3. Error Handling & Loading States

- **App-level Loading**: Single loading state at the top level
- **Error Handling**: Centralized error handling with fallback to static data
- **Graceful Degradation**: App continues to work even if API fails

### 4. Updated Components

- **Layout**: Profile dropdown and start menu now use API data
- **About Page**: Profile, skills, and work experience from API
- **Projects Page**: Projects data from API

## Data Structure Expected

The API should return data in the following format:

### Profile

```json
{
  "name": "string",
  "title": "string",
  "phone": "string",
  "email": "string",
  "linkedin": "string",
  "location": "string",
  "summary": "string"
}
```

### Skills

```json
{
  "hardSkills": ["string", "string", ...],
  "softSkills": ["string", "string", ...]
}
```

### Projects

```json
[
  {
    "id": "number",
    "title": "string",
    "description": "string",
    "tags": ["string", "string", ...],
    "images": ["string", "string", ...],
    "company": "string",
    "year": "string"
  }
]
```

### Work Experience

```json
[
  {
    "id": "number",
    "company": "string",
    "location": "string",
    "position": "string",
    "period": "string",
    "startDate": "string",
    "endDate": "string",
    "description": "string",
    "responsibilities": ["string", "string", ...]
  }
]
```

## Fallback Behavior

If the API is unavailable or returns an error:

1. The app will automatically fall back to static data from `src/data/` folder
2. Users will see loading states during the fallback
3. No functionality is lost - the app continues to work normally

## Testing

To test the API integration:

1. Check browser console for API call logs
2. Verify loading states appear briefly
3. Test with network disabled to see fallback behavior
4. Check that all data displays correctly

## Future Enhancements

- Add retry logic for failed API calls
- Implement caching to reduce API calls
- Add offline support with service workers
- Add data refresh functionality
