
import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { Map, MapPin, MapPinCheck, Route, Plus, Minus, Navigation } from 'lucide-react';
import { toast } from 'sonner';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

const containerStyle = {
  width: '100%',
  height: '100%'
};

// Google Maps API key - replace with your actual API key
const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your Google Maps API key

const InteractiveMap = () => {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.006 });
  const [zoom, setZoom] = useState(13);
  const [selectedLocations, setSelectedLocations] = useState<any[]>([]);
  const [showRoutePanel, setShowRoutePanel] = useState(false);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number, lng: number } | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  });

  // Sample locations data - in a real app this would come from an API
  const pointsOfInterest = [
    { id: 1, name: "Central Park", type: "attraction", lat: 40.7812, lng: -73.9665 },
    { id: 2, name: "Times Square", type: "attraction", lat: 40.7580, lng: -73.9855 },
    { id: 3, name: "Empire State Building", type: "landmark", lat: 40.7484, lng: -73.9857 },
    { id: 4, name: "Brooklyn Bridge", type: "landmark", lat: 40.7061, lng: -73.9969 },
    { id: 5, name: "Shake Shack", type: "restaurant", lat: 40.7414, lng: -74.0055 },
    { id: 6, name: "The Met", type: "museum", lat: 40.7794, lng: -73.9632 },
  ];
  
  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(userLocation);
          setMapCenter(userLocation);
          toast.success("Found your location!");
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Could not get your location. Using default location.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  }, []);

  // Map controls
  const handleZoomIn = () => setZoom(Math.min(zoom + 1, 18));
  const handleZoomOut = () => setZoom(Math.max(zoom - 1, 5));
  
  // Location selection
  const toggleLocationSelection = (location: any) => {
    if (selectedLocations.find(loc => loc.id === location.id)) {
      setSelectedLocations(selectedLocations.filter(loc => loc.id !== location.id));
      // Clear directions when removing a location
      if (selectedLocations.length <= 2) {
        setDirections(null);
      }
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

  // Function to calculate the optimal route
  const calculateOptimalRoute = useCallback(() => {
    if (selectedLocations.length < 2 || !isLoaded) return;
    
    const directionsService = new google.maps.DirectionsService();
    
    // If we have more than 2 locations, we need to optimize the waypoints
    const origin = selectedLocations[0];
    const destination = selectedLocations[selectedLocations.length - 1];
    const waypoints = selectedLocations.slice(1, -1).map(location => ({
      location: new google.maps.LatLng(location.lat, location.lng),
      stopover: true
    }));
    
    directionsService.route(
      {
        origin: new google.maps.LatLng(origin.lat, origin.lng),
        destination: new google.maps.LatLng(destination.lat, destination.lng),
        waypoints: waypoints,
        optimizeWaypoints: true, // This will optimize the route
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
          toast.success("Route optimized!");
        } else {
          toast.error(`Could not calculate route: ${status}`);
        }
      }
    );
  }, [selectedLocations, isLoaded]);

  // Function to open route in Google Maps app/web
  const openInGoogleMaps = () => {
    if (selectedLocations.length < 2) {
      toast.error("Please select at least two locations");
      return;
    }

    let url = "https://www.google.com/maps/dir/?api=1";
    
    // Add origin
    const origin = selectedLocations[0];
    url += `&origin=${origin.lat},${origin.lng}`;
    
    // Add destination (last location)
    const destination = selectedLocations[selectedLocations.length - 1];
    url += `&destination=${destination.lat},${destination.lng}`;
    
    // Add waypoints if there are any (locations in between)
    if (selectedLocations.length > 2) {
      const waypoints = selectedLocations
        .slice(1, -1)
        .map(loc => `${loc.lat},${loc.lng}`)
        .join('|');
      url += `&waypoints=${waypoints}`;
    }
    
    // Open in a new tab
    window.open(url, '_blank');
    toast.success("Opening route in Google Maps");
  };

  // Save the current itinerary to Firebase
  const saveItinerary = async () => {
    if (selectedLocations.length === 0) {
      toast.error("Please select at least one location");
      return;
    }
    
    try {
      await addDoc(collection(db, "itineraries"), {
        userId: "user123", // Replace with actual user ID from authentication
        locations: selectedLocations,
        createdAt: new Date().toISOString(),
        name: `Itinerary ${new Date().toLocaleDateString()}`
      });
      toast.success("Itinerary saved successfully!");
    } catch (error) {
      console.error("Error saving itinerary:", error);
      toast.error("Failed to save itinerary");
    }
  };

  // Map load callback
  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  if (loadError) {
    return <div className="h-full flex items-center justify-center">Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div className="h-full flex items-center justify-center">Loading maps...</div>;
  }

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-gray-100">
      {/* Google Map Container */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={zoom}
        onLoad={onMapLoad}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false
        }}
      >
        {/* Current location marker */}
        {currentLocation && (
          <Marker
            position={currentLocation}
            icon={{
              url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234285F4' width='24' height='24'><circle cx='12' cy='12' r='8'/></svg>",
              scaledSize: new google.maps.Size(16, 16),
              anchor: new google.maps.Point(8, 8)
            }}
          />
        )}
        
        {/* Points of interest markers */}
        {pointsOfInterest.map(poi => {
          const isSelected = selectedLocations.find(loc => loc.id === poi.id);
          return (
            <Marker
              key={poi.id}
              position={{ lat: poi.lat, lng: poi.lng }}
              onClick={() => toggleLocationSelection(poi)}
              icon={{
                url: isSelected 
                  ? "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FF5252' width='36' height='36'><path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/></svg>"
                  : "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2333691E' width='36' height='36'><path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/></svg>",
                scaledSize: new google.maps.Size(36, 36),
                anchor: new google.maps.Point(18, 36)
              }}
              title={poi.name}
            />
          );
        })}

        {/* Render directions if available */}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                strokeColor: '#4285F4',
                strokeWeight: 5
              }
            }}
          />
        )}
      </GoogleMap>
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button variant="secondary" size="icon" onClick={handleZoomIn}>
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" onClick={handleZoomOut}>
          <Minus className="h-4 w-4" />
        </Button>
        <Button 
          variant="secondary" 
          size="icon" 
          onClick={() => currentLocation && setMapCenter(currentLocation)}
          title="Center on my location"
        >
          <Navigation className="h-4 w-4" />
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
            <div className="flex flex-col space-y-2">
              <Button className="flex-1" onClick={calculateOptimalRoute}>
                Optimize Route
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1" onClick={openInGoogleMaps}>
                  Open in Google Maps
                </Button>
                <Button variant="outline" className="flex-1" onClick={saveItinerary}>
                  Save Itinerary
                </Button>
              </div>
              <Button variant="ghost" onClick={() => setSelectedLocations([])}>
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
