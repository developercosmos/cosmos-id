
// This file manages server configuration for the frontend

// Base URL for the website (relative path)
export const SERVER_URL = "";

// Base URL for the API server
export const API_URL = "http://localhost/cosmos-api"; // Change this to match your API server URL

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
