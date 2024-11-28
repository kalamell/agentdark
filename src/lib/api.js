// lib/api.js
import useStore from '../store/store';

const API_URL = process.env.ENDPOINT_API_9SINGHA; // Get the API base URL from environment variables

export async function fetchData(endpoint, options = {}) {
  const { token } = useStore.getState(); // Get token from Zustand
  console.log("APP URL ", API_URL);
  try {
    const res = await fetch(`https://dev-api.9singhabroker.com${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}), // Include token if available
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
}
