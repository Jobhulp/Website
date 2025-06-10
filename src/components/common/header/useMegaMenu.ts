import { useEffect, useState } from 'react';

export const useMegaMenu = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const mobileWidthBase = 1023;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      setWindowWidth(width);
      setIsMobile(width <= mobileWidthBase);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubmenuClick = (menuId: string) => {
    if (isMobile) {
      setActiveSubmenu(activeSubmenu === menuId ? null : menuId);
    }
  };

  const handleMouseEnter = (menuId: string) => {
    if (!isMobile) {
      setActiveSubmenu(menuId);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setActiveSubmenu(null);
    }
  };

  const handleDocumentClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.primary-menu')) {
      setActiveSubmenu(null);
    }
  };

  useEffect(() => {
    if (!isMobile) {
      document.addEventListener('click', handleDocumentClick);
      return () => document.removeEventListener('click', handleDocumentClick);
    }
  }, [isMobile]);

  return {
    isMobile,
    isMenuOpen,
    activeSubmenu,
    toggleMenu,
    handleSubmenuClick,
    handleMouseEnter,
    handleMouseLeave,
    windowWidth
  };
};