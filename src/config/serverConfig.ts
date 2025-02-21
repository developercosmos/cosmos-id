
// This file manages server configuration for the frontend

// Base URL for the website (relative path)
export const SERVER_URL = "http://192.168.1.15"; // Server IP address

// Function to fetch configurations from the server
export const fetchConfigurations = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/src/server/config_api.php`);
    if (!response.ok) throw new Error('Failed to fetch configurations');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching configurations:', error);
    return {};
  }
};
