import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  transitionStage: 'fadeIn' | 'fadeOut';
}

export function PageTransition({ children, transitionStage }: PageTransitionProps) {
  return (
    <div
      className={`transition-all duration-[400ms] ease-in-out ${
        transitionStage === 'fadeOut'
          ? 'opacity-0 scale-[0.98] translate-y-4'
          : 'opacity-100 scale-100 translate-y-0'
      }`}
      style={{ transformOrigin: 'center top' }}
    >
      {children}
    </div>
  );
}
