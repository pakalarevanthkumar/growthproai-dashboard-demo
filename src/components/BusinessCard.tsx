
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MessageCircle, Sparkles, RefreshCw } from 'lucide-react';
import { BusinessData } from '@/services/api';

interface BusinessCardProps {
  businessName: string;
  location: string;
  data: BusinessData;
  onRegenerateHeadline: () => void;
  isRegenerating: boolean;
}

const BusinessCard: React.FC<BusinessCardProps> = ({
  businessName,
  location,
  data,
  onRegenerateHeadline,
  isRegenerating
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-0 bg-gradient-to-br from-white via-blue-50 to-indigo-50 animate-in slide-in-from-bottom-4 duration-500">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800">{businessName}</CardTitle>
            <p className="text-gray-600 flex items-center gap-1 mt-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              {location}
            </p>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
            Live Data
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Rating and Reviews Section */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                {renderStars(data.rating)}
              </div>
              <span className="text-2xl font-bold text-gray-800">{data.rating}</span>
            </div>
            <p className="text-sm text-gray-600">Google Rating</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <span className="text-2xl font-bold text-gray-800">{data.reviews}</span>
            </div>
            <p className="text-sm text-gray-600">Customer Reviews</p>
          </div>
        </div>

        {/* SEO Headline Section */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-800">AI-Generated SEO Headline</h3>
          </div>
          
          <p className="text-lg font-medium text-gray-700 mb-4 leading-relaxed">
            "{data.headline}"
          </p>

          <Button
            onClick={onRegenerateHeadline}
            disabled={isRegenerating}
            variant="outline"
            className="bg-white hover:bg-purple-50 border-purple-200 text-purple-700 hover:text-purple-800 transition-all duration-200"
          >
            {isRegenerating ? (
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Generating...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Regenerate SEO Headline
              </div>
            )}
          </Button>
        </div>

        {/* Performance Indicators */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
            <div className="text-lg font-bold text-green-600">Excellent</div>
            <div className="text-xs text-gray-600">SEO Score</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
            <div className="text-lg font-bold text-blue-600">Active</div>
            <div className="text-xs text-gray-600">Status</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border border-gray-100">
            <div className="text-lg font-bold text-purple-600">Growing</div>
            <div className="text-xs text-gray-600">Trend</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessCard;
