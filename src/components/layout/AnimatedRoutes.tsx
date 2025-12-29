import { ReactNode, useEffect, useState } from 'react';
import { Routes, useLocation } from 'react-router-dom';
import { PageTransition } from './PageTransition';

interface AnimatedRoutesProps {
  children: ReactNode;
}

export function AnimatedRoutes({ children }: AnimatedRoutesProps) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState<'fadeIn' | 'fadeOut'>(
    'fadeIn'
  );

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  useEffect(() => {
    if (transitionStage === 'fadeOut') {
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('fadeIn');
      }, 350);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [transitionStage, location]);

  return (
    <PageTransition transitionStage={transitionStage}>
      <Routes location={displayLocation}>{children}</Routes>
    </PageTransition>
  );
}
