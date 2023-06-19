import React, { useState, useEffect } from 'react';
import { ArrowUpCircle } from '../assets/ArrowUpCircle';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`fixed bottom-16 right-5 z-40 text-white hover:bg-white hover:text-orange-500 bg-orange-500 p-1 rounded-full shadow-md  ${
        isVisible
          ? 'opacity-100 visible transition transform duration-500 ease-in-out'
          : 'opacity-0 invisible transition transform duration-500 ease-in-out'
      }`}
      onClick={scrollToTop}
      aria-label='Scroll to top'
    >
      <ArrowUpCircle />
    </button>
  );
};

export default ScrollToTopButton;
