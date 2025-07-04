
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import BusinessForm from '@/components/BusinessForm';
import BusinessCard from '@/components/BusinessCard';
import { businessApi, BusinessData } from '@/services/api';
import { TrendingUp, BarChart3, Users } from 'lucide-react';

const Dashboard = () => {
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (name: string, loc: string) => {
    setIsLoading(true);
    try {
      const data = await businessApi.getBusinessData({ name, location: loc });
      setBusinessData(data);
      setBusinessName(name);
      setLocation(loc);
      toast({
        title: "Business data loaded successfully!",
        description: `Insights for ${name} in ${loc} are ready.`,
      });
    } catch (error) {
      console.error('Error fetching business data:', error);
      toast({
        title: "Failed to load business data",
        description: "Please check if the backend server is running on port 3001.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerateHeadline = async () => {
    if (!businessName || !location) return;
    
    setIsRegenerating(true);
    try {
      const response = await businessApi.regenerateHeadline(businessName, location);
      if (businessData) {
        setBusinessData({
          ...businessData,
          headline: response.headline
        });
      }
      toast({
        title: "New headline generated!",
        description: "Your SEO headline has been refreshed with AI insights.",
      });
    } catch (error) {
      console.error('Error regenerating headline:', error);
      toast({
        title: "Failed to regenerate headline",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                GrowthPro Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Analyze your local business performance and SEO insights</p>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Analytics
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Insights
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {!businessData ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Welcome to Your Business Dashboard
                </h2>
                <p className="text-gray-600 max-w-md">
                  Get instant insights about your local business performance, Google ratings, and AI-powered SEO recommendations.
                </p>
              </div>
              <BusinessForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <button
                  onClick={() => {
                    setBusinessData(null);
                    setBusinessName('');
                    setLocation('');
                  }}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
                >
                  ← Analyze Another Business
                </button>
              </div>
              <BusinessCard
                businessName={businessName}
                location={location}
                data={businessData}
                onRegenerateHeadline={handleRegenerateHeadline}
                isRegenerating={isRegenerating}
              />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              Built with React, Tailwind CSS, and Node.js • GrowthProAI Assignment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
