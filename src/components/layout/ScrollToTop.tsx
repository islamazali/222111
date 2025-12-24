import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToPosition = () => {
      const isMobile = window.innerWidth < 768;
      const targetPosition = isMobile ? 0 : 100;
      const startPosition = window.scrollY;
      const distance = startPosition - targetPosition;
      const duration = 600;
      let start: number | null = null;

      const easeInOutQuad = (t: number): number => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      };

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutQuad(progress);

        window.scrollTo(0, startPosition - distance * ease);

        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      };

      setTimeout(() => {
        requestAnimationFrame(animation);
      }, 150);
    };

    scrollToPosition();
  }, [pathname]);

  return null;
}
