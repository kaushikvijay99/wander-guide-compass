
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Utensils, MapPin, Calendar, ShoppingCart, Star } from 'lucide-react';
import CuisineCard from './CuisineCard';
import ProductCard from './ProductCard';
import ActivityCard from './ActivityCard';

// Sample data - in a real app this would come from an API
const cuisineData = [
  {
    id: 1,
    name: "Neapolitan Pizza",
    description: "Authentic wood-fired pizza with San Marzano tomatoes and buffalo mozzarella.",
    price: "$$",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: "Da Michele Pizzeria"
  },
  {
    id: 2,
    name: "Fresh Seafood Paella",
    description: "Traditional Spanish rice dish with local seafood and saffron.",
    price: "$$$",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: "Playa del Mar Restaurant"
  },
  {
    id: 3,
    name: "Dim Sum Selection",
    description: "Variety of steamed dumplings and small plates from a century-old recipe.",
    price: "$$",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    location: "Golden Pearl Dim Sum"
  },
];

const productsData = [
  {
    id: 1,
    name: "Modena Balsamic Vinegar",
    description: "Authentic aged balsamic vinegar with protected geographical indication.",
    price: "$$$",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1608486222342-73c6820fe42d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    origin: "Modena, Italy"
  },
  {
    id: 2,
    name: "Handwoven Silk Scarf",
    description: "Traditional silk scarf made using ancient weaving techniques.",
    price: "$$$$",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1622760807800-66cf1466fc08?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    origin: "Chiang Mai, Thailand"
  },
  {
    id: 3,
    name: "Artisanal Olive Oil",
    description: "Cold-pressed extra virgin olive oil from century-old groves.",
    price: "$$",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    origin: "Andalusia, Spain"
  },
];

const activitiesData = [
  {
    id: 1,
    name: "Sunset Sailing Tour",
    description: "Experience the coastline with a guided sunset sailing adventure.",
    price: "$$$",
    duration: "3 hours",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1500514966906-fe245eea9344?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    time: "Daily, 5:30 PM"
  },
  {
    id: 2,
    name: "Artisan Workshop",
    description: "Learn traditional pottery techniques from local master craftsmen.",
    price: "$$",
    duration: "2 hours",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1604873989257-62499ae4e33b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    time: "Weekdays, 10:00 AM & 2:00 PM"
  },
  {
    id: 3,
    name: "Hidden Waterfall Hike",
    description: "Guided trek through lush forests to a secluded waterfall.",
    price: "$$",
    duration: "4 hours",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1564221710304-0b37c8b9d729?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    time: "Tue, Thu, Sat, 8:00 AM"
  },
];

const DestinationHighlights = () => {
  const [activeTab, setActiveTab] = useState("cuisine");

  return (
    <div className="py-12 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center">Explore Local Experiences</h2>
          <p className="text-muted-foreground text-center max-w-2xl mt-3">
            Discover the best local cuisine, authentic products, and unforgettable activities that make this destination unique.
          </p>
        </div>

        <Tabs defaultValue="cuisine" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 w-full max-w-lg">
              <TabsTrigger value="cuisine" className="flex items-center">
                <Utensils className="mr-2 h-4 w-4" />
                <span>Cuisine</span>
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center">
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>GI Products</span>
              </TabsTrigger>
              <TabsTrigger value="activities" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Activities</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="cuisine" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cuisineData.map(item => (
                <CuisineCard key={item.id} cuisine={item} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="products" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productsData.map(item => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="activities" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activitiesData.map(item => (
                <ActivityCard key={item.id} activity={item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-center mt-8">
          <Button>
            See all {activeTab}
            <MapPin className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DestinationHighlights;
