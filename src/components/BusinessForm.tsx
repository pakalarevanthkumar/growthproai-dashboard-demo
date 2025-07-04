
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, MapPin } from 'lucide-react';

interface BusinessFormProps {
  onSubmit: (name: string, location: string) => void;
  isLoading: boolean;
}

const BusinessForm: React.FC<BusinessFormProps> = ({ onSubmit, isLoading }) => {
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (businessName.trim() && location.trim()) {
      onSubmit(businessName.trim(), location.trim());
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-gradient-to-br from-white to-blue-50">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <Building2 className="w-6 h-6 text-blue-600" />
          Business Dashboard
        </CardTitle>
        <p className="text-gray-600 text-sm">Enter your business details to get insights</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="business-name" className="text-sm font-medium text-gray-700">
              Business Name
            </Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="business-name"
                type="text"
                placeholder="e.g., Cake & Co"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium text-gray-700">
              Location
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="location"
                type="text"
                placeholder="e.g., Mumbai"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
            disabled={isLoading || !businessName.trim() || !location.trim()}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing Business...
              </div>
            ) : (
              'Get Business Insights'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BusinessForm;
