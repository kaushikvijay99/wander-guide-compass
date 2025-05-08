
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, MapPinCheck } from 'lucide-react';
import { toast } from 'sonner';

interface ItineraryItemProps {
  item: {
    id: number;
    name: string;
    type: string;
    image: string;
    location: string;
    time: string;
    duration: string;
    completed: boolean;
  };
  onToggleComplete: () => void;
}

const ItineraryItem = ({ item, onToggleComplete }: ItineraryItemProps) => {
  const handleViewOnMap = () => {
    toast(`Showing ${item.name} on map`);
  };

  // Set background color based on activity type
  const getBadgeColor = () => {
    switch(item.type) {
      case 'activity':
        return 'bg-blue-100 text-blue-700';
      case 'dining':
        return 'bg-orange-100 text-orange-700';
      case 'shopping':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className={`flex rounded-lg border p-4 ${item.completed ? 'bg-gray-50/50' : 'bg-white'}`}>
      <div className="flex-shrink-0 mr-4">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <Checkbox 
            checked={item.completed}
            onCheckedChange={onToggleComplete}
            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
        </div>
      </div>
      
      <div className="flex flex-grow flex-col md:flex-row md:items-center">
        <div className="flex-grow min-w-0">
          <div className="flex items-center mb-1">
            <h4 className={`font-medium truncate ${item.completed ? 'text-muted-foreground line-through' : ''}`}>
              {item.name}
            </h4>
            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full capitalize ${getBadgeColor()}`}>
              {item.type}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="mr-1 h-3.5 w-3.5" />
              <span>{item.time} ({item.duration})</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-1 h-3.5 w-3.5" />
              <span>{item.location}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center mt-3 md:mt-0 space-x-2">
          <div className="h-12 w-16 rounded overflow-hidden hidden md:block">
            <img 
              src={item.image} 
              alt={item.name}
              className="h-full w-full object-cover"
            />
          </div>
          <Button size="sm" variant="outline" onClick={handleViewOnMap}>
            <MapPinCheck className="h-3.5 w-3.5 mr-1" />
            Map
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItineraryItem;
