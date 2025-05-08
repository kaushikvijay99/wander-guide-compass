
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Compass, Map, Calendar, User } from 'lucide-react';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Compass className="h-6 w-6 text-primary" />
          <span className="text-xl font-display font-bold text-travel-navy">WanderGuide</span>
        </Link>

        {/* Search Bar - Expandable on mobile */}
        <div className={`${isSearchOpen ? 'flex absolute left-0 right-0 top-0 bottom-0 bg-white px-4' : 'hidden md:flex'} 
                         flex-grow max-w-md mx-4 relative`}>
          {isSearchOpen && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute left-4 h-16" 
              onClick={() => setIsSearchOpen(false)}
            >
              <span className="sr-only">Close</span>
              &times;
            </Button>
          )}
          <div className="w-full flex items-center">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search destinations, activities..." 
                className="pl-10 pr-4 w-full" 
              />
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <Link to="/explore">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Map className="mr-2 h-4 w-4" />
              Explore
            </Button>
          </Link>

          <Link to="/plan">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Calendar className="mr-2 h-4 w-4" />
              Plan
            </Button>
          </Link>

          <Button variant="outline" size="sm" className="ml-2">
            <User className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Account</span>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
