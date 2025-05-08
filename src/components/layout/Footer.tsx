
import { Link } from 'react-router-dom';
import { Compass, MapPin, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-travel-navy text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Compass className="h-6 w-6 text-primary" />
              <span className="text-xl font-display font-bold">WanderGuide</span>
            </Link>
            <p className="text-gray-300 text-sm mb-4">
              Your smart travel companion for discovering local experiences and planning the perfect trip.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Discover</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/destinations" className="hover:text-primary transition-colors">Destinations</Link></li>
              <li><Link to="/experiences" className="hover:text-primary transition-colors">Experiences</Link></li>
              <li><Link to="/cuisine" className="hover:text-primary transition-colors">Local Cuisine</Link></li>
              <li><Link to="/products" className="hover:text-primary transition-colors">GI Products</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Plan</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/itineraries" className="hover:text-primary transition-colors">Itineraries</Link></li>
              <li><Link to="/bookings" className="hover:text-primary transition-colors">Bookings</Link></li>
              <li><Link to="/tours" className="hover:text-primary transition-colors">Tours & Activities</Link></li>
              <li><Link to="/transportation" className="hover:text-primary transition-colors">Transportation</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">© 2024 WanderGuide. All rights reserved.</p>
          <div className="flex items-center mt-4 md:mt-0">
            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-gray-400 text-sm">Explore the world with confidence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
