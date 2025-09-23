import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useNavigationWithLoading = () => {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);
  const [targetSection, setTargetSection] = useState<string>("");

  const navigateWithLoading = (path: string, sectionName: string, delay: number = 800) => {
    setTargetSection(sectionName);
    setIsNavigating(true);
    
    setTimeout(() => {
      setIsNavigating(false);
      navigate(path);
      setTargetSection("");
    }, delay);
  };

  return {
    navigateWithLoading,
    isNavigating,
    targetSection
  };
};