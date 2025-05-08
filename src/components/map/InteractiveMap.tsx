
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Map, MapPin, MapPinCheck, Route, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

// We're using a placeholder map image for now - in a real implementation this would be Google Maps API
const InteractiveMap = () => {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.006 });
  const [zoom, setZoom] = useState(13);
  const [selectedLocations, setSelectedLocations] = useState<any[]>([]);
  const [showRoutePanel, setShowRoutePanel] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Sample locations data - in a real app this would come from an API
  const pointsOfInterest = [
    { id: 1, name: "Central Park", type: "attraction", lat: 40.7812, lng: -73.9665 },
    { id: 2, name: "Times Square", type: "attraction", lat: 40.7580, lng: -73.9855 },
    { id: 3, name: "Empire State Building", type: "landmark", lat: 40.7484, lng: -73.9857 },
    { id: 4, name: "Brooklyn Bridge", type: "landmark", lat: 40.7061, lng: -73.9969 },
    { id: 5, name: "Shake Shack", type: "restaurant", lat: 40.7414, lng: -74.0055 },
    { id: 6, name: "The Met", type: "museum", lat: 40.7794, lng: -73.9632 },
  ];
  
  // Map controls
  const handleZoomIn = () => setZoom(Math.min(zoom + 1, 18));
  const handleZoomOut = () => setZoom(Math.max(zoom - 1, 5));
  
  // Location selection
  const toggleLocationSelection = (location: any) => {
    if (selectedLocations.find(loc => loc.id === location.id)) {
      setSelectedLocations(selectedLocations.filter(loc => loc.id !== location.id));
    } else {
      setSelectedLocations([...selectedLocations, location]);
      toast.success(`Added ${location.name} to your route`);
    }
  };
  
  // Calculate route when 2 or more locations are selected
  useEffect(() => {
    if (selectedLocations.length >= 2) {
      setShowRoutePanel(true);
    } else {
      setShowRoutePanel(false);
    }
  }, [selectedLocations]);

  const calculateOptimalRoute = () => {
    // This would be implemented with a real routing algorithm
    toast.success("Optimal route calculated!");
  };

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-gray-100">
      {/* Map Container */}
      <div 
        ref={mapRef} 
        className="h-full w-full bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center"
      >
        {/* We would render the actual Google Map here */}
        
        {/* Placeholder Map Points */}
        <div className="relative h-full w-full">
          {pointsOfInterest.map(poi => (
            <TooltipProvider key={poi.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    onClick={() => toggleLocationSelection(poi)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10 ${
                      selectedLocations.find(loc => loc.id === poi.id) 
                        ? 'text-white bg-accent animate-pulse-soft' 
                        : 'text-white bg-primary'
                    }`}
                    style={{
                      top: `${(1 - (poi.lat - 40.7) / 0.15) * 100}%`, 
                      left: `${((poi.lng + 74.05) / 0.15) * 100}%`
                    }}
                  >
                    {selectedLocations.find(loc => loc.id === poi.id) ? (
                      <MapPinCheck className="h-8 w-8" />
                    ) : (
                      <MapPin className="h-8 w-8" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">{poi.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{poi.type}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button variant="secondary" size="icon" onClick={handleZoomIn}>
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" onClick={handleZoomOut}>
          <Minus className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Route Planning Panel */}
      {showRoutePanel && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 md:max-w-md animate-fade-in">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-display text-lg font-semibold flex items-center">
              <Route className="mr-2 h-5 w-5 text-primary" />
              Route Planner
            </h3>
            <span className="text-sm text-muted-foreground">{selectedLocations.length} stops</span>
          </div>
          
          <div className="space-y-2 mb-3">
            {selectedLocations.map((location, index) => (
              <div key={location.id} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center mr-2">
                    {index + 1}
                  </div>
                  <span>{location.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleLocationSelection(location)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
          
          {selectedLocations.length >= 2 && (
            <div className="flex space-x-2">
              <Button className="flex-1" onClick={calculateOptimalRoute}>
                Optimize Route
              </Button>
              <Button variant="outline" onClick={() => setSelectedLocations([])}>
                Clear All
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
