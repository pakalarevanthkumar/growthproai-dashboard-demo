
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

// Mock headlines for simulation
const mockHeadlines = [
  "Why {name} is {location}'s Best Kept Secret in 2025",
  "How {name} Became {location}'s Top-Rated Business This Year",
  "The Ultimate Guide to {name} - {location}'s Premier Destination",
  "{name}: Your Go-To Spot in {location} for Excellence",
  "Discover Why {name} is {location}'s Most Loved Business",
  "From Local Favorite to {location} Legend: The {name} Story",
  "{name} - Where {location} Meets Quality and Service",
  "Breaking: {name} Transforms {location}'s Business Landscape"
];

// Mock function to simulate API delay
const simulateNetworkDelay = () => new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

// Mock function to generate business data
const generateMockBusinessData = (name: string, location: string): BusinessData => {
  const ratings = [4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8];
  const reviewCounts = [67, 89, 127, 156, 203, 245, 289, 312, 387, 429];
  
  const randomRating = ratings[Math.floor(Math.random() * ratings.length)];
  const randomReviews = reviewCounts[Math.floor(Math.random() * reviewCounts.length)];
  const randomHeadline = mockHeadlines[Math.floor(Math.random() * mockHeadlines.length)]
    .replace(/{name}/g, name)
    .replace(/{location}/g, location);

  return {
    rating: randomRating,
    reviews: randomReviews,
    headline: randomHeadline
  };
};

export const businessApi = {
  async getBusinessData(data: BusinessRequest): Promise<BusinessData> {
    console.log('Fetching business data for:', data);
    
    // Simulate network delay
    await simulateNetworkDelay();
    
    // For demo purposes, we'll use mock data instead of real API
    // In a real app, this would make the actual API call:
    // const response = await fetch(`${API_BASE_URL}/business-data`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    
    try {
      // Try to make real API call first
      const response = await fetch(`${API_BASE_URL}/business-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Backend not available');
      }

      return response.json();
    } catch (error) {
      // If backend is not available, use mock data
      console.log('Backend not available, using mock data');
      return generateMockBusinessData(data.name, data.location);
    }
  },

  async regenerateHeadline(name: string, location: string): Promise<{ headline: string }> {
    console.log('Regenerating headline for:', name, location);
    
    // Simulate network delay
    await simulateNetworkDelay();
    
    try {
      // Try to make real API call first
      const response = await fetch(
        `${API_BASE_URL}/regenerate-headline?name=${encodeURIComponent(name)}&location=${encodeURIComponent(location)}`
      );

      if (!response.ok) {
        throw new Error('Backend not available');
      }

      return response.json();
    } catch (error) {
      // If backend is not available, generate mock headline
      console.log('Backend not available, generating mock headline');
      const randomHeadline = mockHeadlines[Math.floor(Math.random() * mockHeadlines.length)]
        .replace(/{name}/g, name)
        .replace(/{location}/g, location);
      
      return { headline: randomHeadline };
    }
  }
};
