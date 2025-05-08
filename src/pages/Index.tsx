
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/hero/HeroSection";
import FeatureSection from "@/components/features/FeatureSection";
import InteractiveMap from "@/components/map/InteractiveMap";
import DestinationHighlights from "@/components/destinations/DestinationHighlights";
import BookingPlanner from "@/components/planner/BookingPlanner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Map, Compass } from "lucide-react";

const Index = () => {
  const [activeView, setActiveView] = useState("discover");

  return (
    <MainLayout>
      <HeroSection />
      <FeatureSection />
      
      {/* Main Tab Navigation */}
      <div className="sticky top-16 bg-white z-40 shadow-sm border-b">
        <div className="container mx-auto px-4">
          <Tabs 
            defaultValue="discover" 
            className="w-full"
            onValueChange={(value) => setActiveView(value)}
          >
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
              <TabsTrigger value="discover" className="py-4">
                <Compass className="mr-2 h-4 w-4" />
                Discover
              </TabsTrigger>
              <TabsTrigger value="plan" className="py-4">
                <Map className="mr-2 h-4 w-4" />
                Plan
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      {/* Content based on selected tab */}
      {activeView === "discover" ? (
        <>
          <InteractiveMap />
          <DestinationHighlights />
        </>
      ) : (
        <>
          <BookingPlanner />
        </>
      )}
      
      {/* Call to Action */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold mb-4">Ready for your next adventure?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Start planning your perfect trip with our smart travel companion. 
            Discover hidden gems, optimize your routes, and create unforgettable memories.
          </p>
          <Button size="lg" className="px-8">
            Start Exploring
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
