
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Route, MapPin, Bell, ShoppingCart } from 'lucide-react';

const features = [
  {
    icon: <Route className="h-10 w-10 text-primary" />,
    title: "Smart Route Planning",
    description: "Automatically calculate the optimal routes between your selected destinations to save time and make the most of your trip."
  },
  {
    icon: <MapPin className="h-10 w-10 text-primary" />,
    title: "Hidden Gems",
    description: "Discover local secrets and off-the-beaten-path attractions that most tourists miss out on."
  },
  {
    icon: <Bell className="h-10 w-10 text-primary" />,
    title: "Proactive Alerts",
    description: "Receive smart notifications about nearby attractions, events, or dining options based on your preferences and location."
  },
  {
    icon: <ShoppingCart className="h-10 w-10 text-primary" />,
    title: "Local GI Products",
    description: "Explore and purchase authentic local products with geographical indication protection from the regions you visit."
  }
];

const FeatureSection = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold">Transform Your Travel Experience</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Our smart travel companion provides intelligent features designed to enhance your journey 
            and help you discover the best each location has to offer.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <Card key={i} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="mb-3">{feature.icon}</div>
                <CardTitle className="font-display text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
