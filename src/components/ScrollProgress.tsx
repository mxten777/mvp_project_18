import React, { useState, useEffect } from 'react';

interface ScrollProgressProps {
  className?: string;
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({ className = '' }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 h-1 bg-gradient-to-r from-primary-500 to-primary-400 z-50 transition-all duration-150 ${className}`} 
         style={{ width: `${scrollProgress}%` }} />
  );
};

export default ScrollProgress;