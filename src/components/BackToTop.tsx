import React, { useState, useEffect } from 'react';
import Button from './Button';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
    }`}>
      <Button
        variant="primary"
        size="icon"
        onClick={scrollToTop}
        className="rounded-full shadow-large hover:shadow-glow group"
        aria-label="맨 위로 이동"
      >
        <svg 
          width="20" 
          height="20" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          viewBox="0 0 24 24"
          className="transition-transform duration-300 group-hover:-translate-y-1"
        >
          <path d="M7 14l5-5 5 5"/>
          <path d="M7 20l5-5 5 5"/>
        </svg>
      </Button>
    </div>
  );
};

export default BackToTop;