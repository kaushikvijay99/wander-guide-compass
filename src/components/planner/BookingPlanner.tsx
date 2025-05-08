
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, Route, CircleCheck } from 'lucide-react';
import { toast } from 'sonner';
import ItineraryItem from './ItineraryItem';
import SuggestedActivities from './SuggestedActivities';

// Sample itinerary data - in a real app this would be stored in a state management system
const sampleItinerary = [
  {
    id: 1,
    name: "Visit the Historic Old Town",
    type: "activity",
    image: "https://images.unsplash.com/photo-1600193885604-40dce28d60fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    location: "Old Town Square",
    time: "10:00 AM",
    duration: "2 hours",
    completed: false
  },
  {
    id: 2,
    name: "Lunch at Seafront Restaurant",
    type: "dining",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    location: "Marina Bay",
    time: "12:30 PM",
    duration: "1.5 hours",
    completed: false
  },
  {
    id: 3,
    name: "Artisan Market Shopping",
    type: "shopping",
    image: "https://images.unsplash.com/photo-1615400077939-0d992e092b79?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    location: "Craft District",
    time: "2:30 PM",
    duration: "1.5 hours",
    completed: false
  },
];

const BookingPlanner = () => {
  const [itinerary, setItinerary] = useState(sampleItinerary);
  const [currentDay, setCurrentDay] = useState("day1");
  
  const handleToggleCompleted = (id: number) => {
    setItinerary(
      itinerary.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    
    const item = itinerary.find(item => item.id === id);
    if (item) {
      toast(item.completed ? `Unmarked "${item.name}"` : `Completed "${item.name}"!`, {
        icon: !item.completed ? "🎉" : undefined,
      });
    }
  };
  
  const handleViewOnMap = () => {
    toast("Opening itinerary on map");
  };

  return (
    <div className="bg-white py-12">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8">
          <div>
            <h2 className="text-3xl font-display font-bold">Your Travel Plan</h2>
            <p className="text-muted-foreground">Plan your perfect trip with our easy-to-use planner</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="outline" className="mr-2">
              <Calendar className="mr-2 h-4 w-4" />
              New Day
            </Button>
            <Button onClick={handleViewOnMap}>
              <Route className="mr-2 h-4 w-4" />
              View on Map
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-md">
              <CardContent className="p-0">
                <Tabs defaultValue="day1" className="w-full">
                  <div className="border-b">
                    <TabsList className="p-0 bg-transparent border-b rounded-none h-auto">
                      <TabsTrigger 
                        value="day1" 
                        className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none py-3 px-5 data-[state=active]:shadow-none"
                        onClick={() => setCurrentDay("day1")}
                      >
                        Day 1
                      </TabsTrigger>
                      <TabsTrigger 
                        value="day2" 
                        className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none py-3 px-5 data-[state=active]:shadow-none"
                        onClick={() => setCurrentDay("day2")}
                      >
                        Day 2
                      </TabsTrigger>
                      <TabsTrigger 
                        value="day3" 
                        className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none py-3 px-5 data-[state=active]:shadow-none"
                        onClick={() => setCurrentDay("day3")}
                      >
                        Day 3
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="day1">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display font-semibold text-lg">Monday, May 10</h3>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <CircleCheck className="mr-1 h-4 w-4 text-green-500" />
                          <span>{itinerary.filter(i => i.completed).length}/{itinerary.length} completed</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4 relative before:absolute before:left-[22px] before:top-2 before:h-[calc(100%-20px)] before:w-[2px] before:bg-gray-100">
                        {itinerary.map(item => (
                          <ItineraryItem 
                            key={item.id} 
                            item={item} 
                            onToggleComplete={() => handleToggleCompleted(item.id)} 
                          />
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="day2">
                    <div className="flex flex-col items-center justify-center py-12">
                      <Calendar className="h-12 w-12 text-muted-foreground mb-2" />
                      <h3 className="font-display font-semibold text-xl mb-2">Tuesday, May 11</h3>
                      <p className="text-muted-foreground mb-4">Your itinerary for this day is empty</p>
                      <Button>
                        Start Planning
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="day3">
                    <div className="flex flex-col items-center justify-center py-12">
                      <Calendar className="h-12 w-12 text-muted-foreground mb-2" />
                      <h3 className="font-display font-semibold text-xl mb-2">Wednesday, May 12</h3>
                      <p className="text-muted-foreground mb-4">Your itinerary for this day is empty</p>
                      <Button>
                        Start Planning
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <SuggestedActivities />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPlanner;
