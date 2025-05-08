
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Star, MapPin, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface CuisineCardProps {
  cuisine: {
    id: number;
    name: string;
    description: string;
    price: string;
    rating: number;
    image: string;
    location: string;
  };
}

const CuisineCard = ({ cuisine }: CuisineCardProps) => {
  const handleAddToItinerary = () => {
    toast.success(`Added ${cuisine.name} to your itinerary`);
  };

  const handleViewOnMap = () => {
    toast(`Showing ${cuisine.location} on map`);
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={cuisine.image} 
          alt={cuisine.name}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium">
          {cuisine.price}
        </div>
      </div>
      
      <CardContent className="pt-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display font-semibold text-lg">{cuisine.name}</h3>
          <div className="flex items-center text-amber-500">
            <Star className="fill-amber-500 h-4 w-4" />
            <span className="ml-1 text-sm">{cuisine.rating}</span>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-3">{cuisine.description}</p>
        
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{cuisine.location}</span>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2 pb-4">
        <Button variant="outline" size="sm" onClick={handleViewOnMap}>
          View on Map
        </Button>
        <Button size="sm" onClick={handleAddToItinerary}>
          <Plus className="mr-1 h-4 w-4" />
          Add to Plan
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CuisineCard;
