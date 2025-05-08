
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, MapPin, Search } from 'lucide-react';
import { toast } from 'sonner';

const HeroSection = () => {
  const [destination, setDestination] = useState('');
  
  const handleExplore = () => {
    if (destination) {
      toast.success(`Exploring ${destination}`);
    } else {
      toast.error('Please enter a destination');
    }
  };

  return (
    <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden bg-travel-navy flex items-center">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')`,
          filter: 'brightness(0.7)'
        }}
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-4">
            Discover Your Perfect Journey
          </h1>
          <p className="text-xl opacity-90 mb-8 max-w-lg">
            Explore local treasures, plan your route, and create unforgettable experiences with our smart travel companion.
          </p>
          
          {/* Search Form */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-grow">
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-white" />
                <Input 
                  type="text"
                  placeholder="Where would you like to go?" 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 h-11"
                />
              </div>
              <div className="relative md:w-48">
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-white" />
                <Input 
                  type="text"
                  placeholder="When?" 
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 h-11"
                />
              </div>
              <Button onClick={handleExplore} className="h-11 px-6 bg-primary hover:bg-primary/90">
                <Search className="mr-2 h-4 w-4" />
                Explore
              </Button>
            </div>
          </div>
          
          {/* Badges */}
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
              Interactive Maps
            </span>
            <span className="bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
              Smart Itineraries
            </span>
            <span className="bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
              Local Experiences
            </span>
            <span className="bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
              Real-time Guides
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
