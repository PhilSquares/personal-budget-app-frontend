import API_BASE_URL from "./config";

export const getEnvelopes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/envelopes`);
    const data = await response.json();
    return data.envelopes;  // Ensure we return the array of envelopes
  } catch (error) {
    console.error("Error fetching envelopes:", error);
    return [];
  }
};
