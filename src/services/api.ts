
const API_BASE_URL = 'http://localhost:3001';

export interface BusinessData {
  rating: number;
  reviews: number;
  headline: string;
}

export interface BusinessRequest {
  name: string;
  location: string;
}

export const businessApi = {
  async getBusinessData(data: BusinessRequest): Promise<BusinessData> {
    const response = await fetch(`${API_BASE_URL}/business-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch business data');
    }

    return response.json();
  },

  async regenerateHeadline(name: string, location: string): Promise<{ headline: string }> {
    const response = await fetch(
      `${API_BASE_URL}/regenerate-headline?name=${encodeURIComponent(name)}&location=${encodeURIComponent(location)}`
    );

    if (!response.ok) {
      throw new Error('Failed to regenerate headline');
    }

    return response.json();
  }
};
