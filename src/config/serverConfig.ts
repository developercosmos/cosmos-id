
// This file manages server configuration for the frontend

// Base URL for the website (relative path)
export const SERVER_URL = "http://localhost:8000"; // Adjust this to match your PHP server URL

// Base URL for the API server
export const API_URL = "https://api.cosmos.id"; // Change this to match your API server URL

// Function to fetch configurations from the server
export const fetchConfigurations = async () => {
  try {
    const response = await fetch(`${API_URL}/api/config`);
    if (!response.ok) throw new Error('Failed to fetch configurations');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching configurations:', error);
    return {};
  }
};
