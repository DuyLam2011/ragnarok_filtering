'use client';

import { useRouter, usePathname } from 'next/navigation';
import { ArrowUp, Home } from 'lucide-react';

export default function FloatingNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const scrollToTop = () => {
    const duration = 500; // Duration in milliseconds
    const startingY = window.pageYOffset;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      // Easing function for smooth deceleration
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      
      window.scrollTo(0, startingY * (1 - easeOutCubic(progress)));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const goHome = () => {
    router.push('/');
  };

  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
      <button
        onClick={scrollToTop}
        className="p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-200 group"
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} className="group-hover:scale-110 transition-transform" />
      </button>
      {pathname !== '/' && (
        <button
          onClick={goHome}
          className="p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-200 group"
          aria-label="Go to homepage"
        >
          <Home size={24} className="group-hover:scale-110 transition-transform" />
        </button>
      )}
    </div>
  );
}
