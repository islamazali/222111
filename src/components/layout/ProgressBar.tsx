import { usePageProgress } from '../../hooks/usePageProgress';

export function ProgressBar() {
  const { progress, isLoading } = usePageProgress();

  if (!isLoading && progress === 0) return null;

  return (
    <div className="fixed top-0 right-0 left-0 z-[100] h-1 bg-secondary-200/20 dark:bg-secondary-800/20 overflow-hidden">
      <div
        className="h-full gradient-primary transition-all duration-500 ease-out shadow-lg shadow-primary-500/50 relative"
        style={{
          width: `${progress}%`,
          transform: `translateX(${progress === 100 ? '0' : '-2px'})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
      </div>
    </div>
  );
}
