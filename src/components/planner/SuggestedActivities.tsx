
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Plus, Star } from 'lucide-react';
import { toast } from 'sonner';

// Sample suggestion data
const suggestions = [
  {
    id: 1,
    name: "Sunset Harbor Cruise",
    image: "https://images.unsplash.com/photo-1569263900347-06b1e8c825ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    time: "5:30 PM",
    duration: "2 hours",
    rating: 4.9
  },
  {
    id: 2,
    name: "Wine Tasting Tour",
    image: "https://images.unsplash.com/photo-1528823872057-9c018a7a7553?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    time: "2:00 PM",
    duration: "3 hours",
    rating: 4.7
  },
  {
    id: 3,
    name: "Local Food Walking Tour",
    image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    time: "11:00 AM",
    duration: "2.5 hours",
    rating: 4.8
  },
];

const SuggestedActivities = () => {
  const handleAddToItinerary = (name: string) => {
    toast.success(`Added "${name}" to your itinerary`);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">You Might Also Like</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {suggestions.map(suggestion => (
          <div key={suggestion.id} className="flex space-x-3 items-center">
            <div className="w-16 h-14 rounded overflow-hidden flex-shrink-0">
              <img 
                src={suggestion.image} 
                alt={suggestion.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-grow min-w-0">
              <div className="flex items-center">
                <h4 className="font-medium text-sm truncate">{suggestion.name}</h4>
                <div className="ml-1 flex items-center text-amber-500 text-xs">
                  <Star className="fill-amber-500 h-3 w-3 mr-0.5" />
                  {suggestion.rating}
                </div>
              </div>
              
              <div className="flex items-center text-xs text-muted-foreground mt-0.5">
                <Clock className="h-3 w-3 mr-1" />
                <span>{suggestion.time} ({suggestion.duration})</span>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 flex-shrink-0" 
              onClick={() => handleAddToItinerary(suggestion.name)}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add to itinerary</span>
            </Button>
          </div>
        ))}
        
        <Button variant="outline" className="w-full mt-2">
          View More Suggestions
        </Button>
      </CardContent>
    </Card>
  );
};

export default SuggestedActivities;
