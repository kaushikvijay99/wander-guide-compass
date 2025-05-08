
import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/hero/HeroSection";
import FeatureSection from "@/components/features/FeatureSection";
import InteractiveMap from "@/components/map/InteractiveMap";
import DestinationHighlights from "@/components/destinations/DestinationHighlights";
import BookingPlanner from "@/components/planner/BookingPlanner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Map, Compass, Calendar } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const [activeView, setActiveView] = useState("discover");
  const { currentUser, logOut } = useAuth();

  return (
    <MainLayout>
      <HeroSection />
      <FeatureSection />
      
      {/* Auth Status Bar */}
      {currentUser ? (
        <div className="bg-primary/10 p-2 px-4 flex justify-between items-center">
          <div>
            Logged in as: <span className="font-semibold">{currentUser.email}</span>
          </div>
          <div className="flex gap-2">
            <Link to="/plan">
              <Button size="sm" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Create Multi-day Plan
              </Button>
            </Link>
            <Button size="sm" variant="ghost" onClick={logOut}>
              Log Out
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-primary/5 p-2 px-4 text-center">
          <Link to="/login">
            <Button size="sm" variant="link">
              Log in
            </Button>
          </Link>
          {" or "}
          <Link to="/signup">
            <Button size="sm" variant="link">
              Sign up
            </Button>
          </Link>
          {" to save your plans and book experiences"}
        </div>
      )}
      
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
          {currentUser ? (
            <Link to="/plan">
              <Button size="lg" className="px-8">
                Create a Multi-day Plan
              </Button>
            </Link>
          ) : (
            <Link to="/signup">
              <Button size="lg" className="px-8">
                Start Planning
              </Button>
            </Link>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
