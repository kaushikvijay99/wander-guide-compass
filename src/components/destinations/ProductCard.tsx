
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Star, MapPin, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: string;
    rating: number;
    image: string;
    origin: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const handleFindShops = () => {
    toast(`Showing shops selling ${product.name}`);
  };

  const handleViewDetails = () => {
    toast.success(`Viewing ${product.name} details`);
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-700" 
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium">
          {product.price}
        </div>
      </div>
      
      <CardContent className="pt-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display font-semibold text-lg">{product.name}</h3>
          <div className="flex items-center text-amber-500">
            <Star className="fill-amber-500 h-4 w-4" />
            <span className="ml-1 text-sm">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-3">{product.description}</p>
        
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{product.origin}</span>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2 pb-4">
        <Button variant="outline" size="sm" onClick={handleFindShops}>
          Find Shops
        </Button>
        <Button size="sm" onClick={handleViewDetails}>
          <ShoppingCart className="mr-1 h-4 w-4" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
