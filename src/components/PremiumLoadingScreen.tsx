import { useEffect, useState } from 'react';

interface PremiumLoadingScreenProps {
  isVisible: boolean;
  message?: string;
  overlay?: boolean;
}

const PremiumLoadingScreen = ({ 
  isVisible, 
  message = "Loading...", 
  overlay = true 
}: PremiumLoadingScreenProps) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center min-h-screen ${
      overlay 
        ? 'bg-gradient-to-br from-medical-cyan/20 via-background/95 to-medical-magenta/20 backdrop-blur-sm' 
        : 'bg-background'
    }`}>
      <div className="text-center space-y-8 animate-fade-in flex flex-col items-center justify-center">
        {/* Premium Spinning Logo at Center */}
        <div className="relative flex justify-center items-center min-h-[200px] w-full max-w-md">
          {/* Outer glow ring */}
          <div className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-medical-cyan/30 to-medical-magenta/30 animate-premium-glow blur-lg"></div>
          
          {/* Middle spinning ring with gradient border effect */}
          <div className="absolute w-28 h-28 md:w-36 md:h-36 rounded-full animate-spin">
            <div className="w-full h-full rounded-full border-2 border-transparent bg-gradient-to-r from-medical-cyan/50 to-medical-magenta/50 p-[2px]">
              <div className="h-full w-full rounded-full bg-background/50 backdrop-blur-sm"></div>
            </div>
          </div>
          
          {/* Logo container with premium spin - perfectly centered */}
          <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-6 md:p-8 shadow-2xl">
            <img 
              src="/lovable-uploads/fc70eb34-882e-4a20-9da3-39a20773fb7c.png" 
              alt="O.A.S.I.S MEDICALS" 
              className="h-16 w-16 md:h-20 md:w-20 animate-premium-spin filter drop-shadow-2xl"
            />
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-premium-shimmer"></div>
          </div>
          
          {/* Pulse rings */}
          <div className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full border border-medical-cyan/40 animate-ping"></div>
          <div className="absolute w-24 h-24 md:w-28 md:h-28 rounded-full border border-medical-magenta/30 animate-ping" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Brand Text */}
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-medical-cyan to-medical-magenta bg-clip-text text-transparent animate-fade-in">
            O.A.S.I.S. MEDICALS
          </h2>
          <p className="text-muted-foreground text-lg animate-fade-in" style={{ animationDelay: '0.3s' }}>
            ...Your Health is our concern.
          </p>
        </div>

        {/* Loading Message */}
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p className="text-foreground/80 text-lg font-medium">
            {message}{dots}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center space-x-2 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-gradient-to-r from-medical-cyan to-medical-magenta rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumLoadingScreen;