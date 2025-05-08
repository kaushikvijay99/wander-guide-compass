
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Plus, Save, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';

interface PlanDay {
  id: string;
  date: string;
  places: {
    id: string;
    name: string;
    type: string;
    time?: string;
    notes?: string;
  }[];
}

const DayPlanCreator = () => {
  const [planName, setPlanName] = useState('My Travel Plan');
  const [days, setDays] = useState<PlanDay[]>([
    { id: '1', date: new Date().toISOString().split('T')[0], places: [] }
  ]);
  const [currentTabIndex, setCurrentTabIndex] = useState('0');
  const [isCreating, setIsCreating] = useState(false);
  
  const { currentUser } = useAuth();

  const addDay = () => {
    const newDay: PlanDay = {
      id: (days.length + 1).toString(),
      date: new Date(new Date().getTime() + days.length * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      places: []
    };
    
    setDays([...days, newDay]);
    // Set the tab to the newly created day
    setCurrentTabIndex(days.length.toString());
  };

  const removeDay = (dayId: string) => {
    if (days.length <= 1) {
      toast.error("You need at least one day in your plan");
      return;
    }
    
    const newDays = days.filter(day => day.id !== dayId);
    setDays(newDays);
    
    // If the current tab is the removed day, switch to the first day
    if (currentTabIndex === dayId) {
      setCurrentTabIndex('0');
    }
  };

  const addPlace = (dayId: string) => {
    const newDays = [...days];
    const dayIndex = newDays.findIndex(day => day.id === dayId);
    
    if (dayIndex !== -1) {
      newDays[dayIndex].places.push({
        id: Date.now().toString(),
        name: '',
        type: 'attraction',
      });
      setDays(newDays);
    }
  };

  const removePlaceFromDay = (dayId: string, placeId: string) => {
    const newDays = [...days];
    const dayIndex = newDays.findIndex(day => day.id === dayId);
    
    if (dayIndex !== -1) {
      newDays[dayIndex].places = newDays[dayIndex].places.filter(place => place.id !== placeId);
      setDays(newDays);
    }
  };

  const updatePlaceInfo = (dayId: string, placeId: string, field: string, value: string) => {
    const newDays = [...days];
    const dayIndex = newDays.findIndex(day => day.id === dayId);
    
    if (dayIndex !== -1) {
      const placeIndex = newDays[dayIndex].places.findIndex(place => place.id === placeId);
      
      if (placeIndex !== -1) {
        newDays[dayIndex].places[placeIndex] = {
          ...newDays[dayIndex].places[placeIndex],
          [field]: value
        };
        setDays(newDays);
      }
    }
  };

  const updateDay = (dayId: string, field: string, value: string) => {
    const newDays = [...days];
    const dayIndex = newDays.findIndex(day => day.id === dayId);
    
    if (dayIndex !== -1) {
      newDays[dayIndex] = { ...newDays[dayIndex], [field]: value };
      setDays(newDays);
    }
  };

  const savePlan = async () => {
    if (!currentUser) {
      toast.error("You must be logged in to save a plan");
      return;
    }
    
    setIsCreating(true);
    try {
      await addDoc(collection(db, "travel-plans"), {
        userId: currentUser.uid,
        name: planName,
        days,
        createdAt: new Date().toISOString()
      });
      toast.success("Travel plan saved successfully!");
    } catch (error) {
      console.error("Error saving plan:", error);
      toast.error("Failed to save your travel plan");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-display font-bold">Travel Plan</h2>
          <p className="text-muted-foreground">Create your multi-day travel itinerary</p>
        </div>
        <div className="flex items-center gap-2">
          <Input 
            value={planName} 
            onChange={(e) => setPlanName(e.target.value)} 
            className="max-w-xs" 
            placeholder="Plan name"
          />
          <Button onClick={savePlan} disabled={isCreating}>
            <Save className="h-4 w-4 mr-2" />
            {isCreating ? 'Saving...' : 'Save Plan'}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <div className="flex justify-between items-center">
            <CardTitle>Days</CardTitle>
            <Button onClick={addDay} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Day
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs value={currentTabIndex} onValueChange={setCurrentTabIndex} className="w-full">
            <TabsList className="mb-4 overflow-x-auto flex w-full">
              {days.map((day, index) => (
                <TabsTrigger key={day.id} value={index.toString()} className="flex-shrink-0">
                  Day {index + 1}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {days.map((day, index) => (
              <TabsContent key={day.id} value={index.toString()} className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    <Input
                      type="date"
                      value={day.date}
                      onChange={(e) => updateDay(day.id, 'date', e.target.value)}
                      className="w-40"
                    />
                  </div>
                  {days.length > 1 && (
                    <Button variant="destructive" size="sm" onClick={() => removeDay(day.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="space-y-4">
                  {day.places.map((place) => (
                    <div key={place.id} className="flex items-start space-x-2 p-2 border rounded-md bg-gray-50">
                      <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-2">
                        <Input
                          placeholder="Place name"
                          value={place.name}
                          onChange={(e) => updatePlaceInfo(day.id, place.id, 'name', e.target.value)}
                          className="col-span-2"
                        />
                        <Select 
                          value={place.type} 
                          onValueChange={(value) => updatePlaceInfo(day.id, place.id, 'type', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="attraction">Attraction</SelectItem>
                            <SelectItem value="restaurant">Restaurant</SelectItem>
                            <SelectItem value="museum">Museum</SelectItem>
                            <SelectItem value="shopping">Shopping</SelectItem>
                            <SelectItem value="activity">Activity</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          placeholder="Time (e.g., 10:00 AM)"
                          value={place.time || ''}
                          onChange={(e) => updatePlaceInfo(day.id, place.id, 'time', e.target.value)}
                        />
                        <Input
                          placeholder="Notes"
                          value={place.notes || ''}
                          onChange={(e) => updatePlaceInfo(day.id, place.id, 'notes', e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => removePlaceFromDay(day.id, place.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => addPlace(day.id)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Place
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DayPlanCreator;
