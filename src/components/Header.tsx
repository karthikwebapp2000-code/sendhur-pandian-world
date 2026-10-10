import { useEffect, useRef, useState } from 'react';
import './Header.css';

export default function Header() {
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      
      // Hide nav when scrolling down past 100px, show when scrolling up
      if (isScrollingDown && currentScrollY > 100) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="header">
      <div className="header-content">
        {/* Name ALWAYS visible - never hides */}
        <a href="#home" className="name-title">
          Karthik<span>.</span>
        </a>
        
        {/* Navigation hides on scroll down */}
        <nav className={`nav-menu ${navVisible ? 'show' : 'hide'}`}>
          <a href="#home">Home</a>
          <a href="#profile">About</a>
          <a href="#github-log">GitHub</a>
        </nav>
      </div>
    </header>
  );
}
