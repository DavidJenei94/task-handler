import { backendUrl } from '../utils/general.utils';

// REGISTRATION
export const register = async (email: string, password: string) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    };

    const response = await fetch(
      `${backendUrl}/registration.php`,
      requestOptions
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data.message;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// LOGIN
export const login = async (email: string, password: string) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    };

    const response = await fetch(
      `${backendUrl}/login.php`,
      requestOptions
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
