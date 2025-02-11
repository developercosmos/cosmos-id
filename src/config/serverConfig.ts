
// This file manages server configuration for the frontend
const getServerUrl = () => {
  return window.location.protocol + '//' + window.location.hostname;
};

export const SERVER_URL = getServerUrl();

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
