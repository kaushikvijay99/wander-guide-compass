
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white">
        <div className="text-center px-4">
          <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
            <Compass className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Oops! You're off the map</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
            We couldn't find the page you were looking for. Let's get you back on track.
          </p>
          <Link to="/">
            <Button size="lg">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
