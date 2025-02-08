import { SERVER_URL } from '../config/serverConfig';

interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: number;
  email: string;
  role: 'superuser' | 'admin' | 'operator' | 'user';
}

export const login = async (credentials: LoginCredentials): Promise<User> => {
  console.log("Attempting login with:", { email: credentials.email });
  
  try {
    const response = await fetch(`${SERVER_URL}/src/server/auth.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        action: 'login',
        ...credentials,
      }),
    });

    console.log("Login response status:", response.status);
    
    const responseText = await response.text();
    console.log("Raw response text:", responseText);
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("JSON parse error:", e);
      throw new Error(`Server response is not valid JSON: ${responseText}`);
    }

    console.log("Parsed response data:", data);

    if (!response.ok) {
      console.error("Server error response:", data);
      throw new Error(data.error || 'Invalid credentials');
    }

    if (!data.success) {
      console.error("Login unsuccessful:", data.error);
      throw new Error(data.error || 'Login failed');
    }

    return data.user;
  } catch (error: any) {
    console.error("Login error in service:", error);
    throw new Error(error.message || 'An unexpected error occurred during login');
  }
};