
// This file manages server configuration for the frontend
export const SERVER_URL = "https://api.cosmos.id";

// Function to fetch configurations from the server
export const fetchConfigurations = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/api/config`);
    if (!response.ok) throw new Error('Failed to fetch configurations');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching configurations:', error);
    return {};
  }
};
