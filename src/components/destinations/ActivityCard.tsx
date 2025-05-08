
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Star, Clock, Calendar, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface ActivityCardProps {
  activity: {
    id: number;
    name: string;
    description: string;
    price: string;
    duration: string;
    rating: number;
    image: string;
    time: string;
  };
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  const handleBookNow = () => {
    toast.success(`Booking ${activity.name}`);
  };

  const handleAddToItinerary = () => {
    toast(`Added ${activity.name} to your itinerary`);
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={activity.image} 
          alt={activity.name}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium">
          {activity.price}
        </div>
      </div>
      
      <CardContent className="pt-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display font-semibold text-lg">{activity.name}</h3>
          <div className="flex items-center text-amber-500">
            <Star className="fill-amber-500 h-4 w-4" />
            <span className="ml-1 text-sm">{activity.rating}</span>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-3">{activity.description}</p>
        
        <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{activity.duration}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{activity.time}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2 pb-4">
        <Button variant="outline" size="sm" onClick={handleAddToItinerary}>
          Add to Plan
        </Button>
        <Button size="sm" onClick={handleBookNow}>
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActivityCard;
