import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function usePageProgress() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    setProgress(0);

    const timer1 = setTimeout(() => setProgress(25), 50);
    const timer2 = setTimeout(() => setProgress(50), 120);
    const timer3 = setTimeout(() => setProgress(75), 200);
    const timer4 = setTimeout(() => setProgress(95), 300);
    const timer5 = setTimeout(() => setProgress(100), 400);
    const timer6 = setTimeout(() => {
      setIsLoading(false);
      setProgress(0);
    }, 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  }, [location.pathname]);

  return { progress, isLoading };
}
