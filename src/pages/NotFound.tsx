import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigationWithLoading } from '@/hooks/useNavigationWithLoading';
import { Button } from '@/components/ui/button';
import PremiumLoadingScreen from '@/components/PremiumLoadingScreen';

const NotFound = () => {
  const location = useLocation();
  const { navigateWithLoading, isNavigating, targetSection } = useNavigationWithLoading();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-medical-cyan/10 via-background to-medical-magenta/10">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-foreground">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Oops! Page not found</p>
        <Button 
          onClick={() => navigateWithLoading('/', 'Home')}
          className="bg-gradient-to-r from-medical-cyan to-medical-magenta hover:opacity-90"
        >
          Return to Home
        </Button>
      </div>
      
      <PremiumLoadingScreen 
        isVisible={isNavigating}
        message={`Navigating to ${targetSection}`}
      />
    </div>
  );
};

export default NotFound;
