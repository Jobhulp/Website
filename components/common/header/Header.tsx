"use client";
import React, { useState, useRef, useEffect } from 'react';
import "./style.css";
import LanguageSwitcher from "./LanguageSwitcher";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from '@/assets/img/svg/01_logo_white.svg';

import { useAuth } from '@/lib/auth-context';
import { User, LogOut, LayoutDashboard, Settings, Bell, ChevronDown } from 'lucide-react';

const Header = () => {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    if (isMenuOpen) {
      toggleMenu();
    }
    setUserMenuOpen(false);
  };

  const handleLogout = async () => {
    setUserMenuOpen(false);
    await logout();
    router.push('/');
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user) return '';
    const email = user.email || '';
    return email.charAt(0).toUpperCase();
  };

  // Get dashboard link based on user type
  const getDashboardLink = () => {
    if (!user) return '/dashboard';
    if (user.userType === 'employer') return '/dashboard/employer';
    return '/dashboard';
  };

  return (
    <>
      <header
        className="header header--sticky header--dark"
        id="site-header"
      >
        <div className="container">
          <div className="header-content-wrapper">
            <Link href="/" className="site-logo" onClick={handleLinkClick}>
              <img
                className="puzzle-icon"
                src={logo.src}
                alt="Jobhulp logo"
                width="120"
              />
            </Link>

            <nav id="primary-menu" className={`primary-menu primary-menu-responsive ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
              <a
                id="menu-icon-trigger"
                className="menu-icon-trigger showhide"
                onClick={toggleMenu}
              >
                <span className="mob-menu--title">Menu</span>
                <span id="menu-icon-wrapper" className="menu-icon-wrapper">
                  <i className="puzzle-icon fas fa-bars fa-lg"></i>
                </span>
              </a>

              <ul className="primary-menu-menu">
                <li>
                  <Link href="/jobs/job-lists" onClick={handleLinkClick}>Vacatures</Link>
                </li>

                <li>
                  <Link href="/candidates/candidate-lists" onClick={handleLinkClick}>Talent</Link>
                </li>

                <li>
                  <Link href="/how-it-works" onClick={handleLinkClick}>Hoe het werkt</Link>
                </li>

                <li>
                  <Link href="/news/news-page" onClick={handleLinkClick}>Blog</Link>
                </li>
              </ul>
            </nav>

            <nav className="login-menu">
              {loading ? (
                // Loading state - show skeleton
                <div className="flex items-center gap-2">
                  <div className="w-20 h-8 bg-white/20 rounded animate-pulse" />
                </div>
              ) : user ? (
                // Logged in - show user menu
                <div className="user-menu-wrapper" ref={userMenuRef}>
                  <button
                    className="user-menu-trigger"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    aria-expanded={userMenuOpen}
                    aria-haspopup="true"
                  >
                    <div className="user-avatar">
                      {getUserInitials()}
                    </div>
                    <ChevronDown 
                      size={16} 
                      className={`user-menu-chevron ${userMenuOpen ? 'rotated' : ''}`}
                    />
                  </button>

                  {userMenuOpen && (
                    <div className="user-dropdown">
                      <div className="user-dropdown-header">
                        <span className="user-dropdown-email">{user.email}</span>
                        <span className="user-dropdown-type">
                          {user.userType === 'employer' ? 'Werkgever' : 'Kandidaat'}
                          {user.isAdmin && ' (Admin)'}
                        </span>
                      </div>
                      
                      <div className="user-dropdown-divider" />
                      
                      <Link 
                        href={getDashboardLink()} 
                        className="user-dropdown-item"
                        onClick={handleLinkClick}
                      >
                        <LayoutDashboard size={18} />
                        <span>Dashboard</span>
                      </Link>
                      
                      <Link 
                        href="/dashboard/notifications" 
                        className="user-dropdown-item"
                        onClick={handleLinkClick}
                      >
                        <Bell size={18} />
                        <span>Meldingen</span>
                      </Link>
                      
                      <Link 
                        href="/dashboard/account" 
                        className="user-dropdown-item"
                        onClick={handleLinkClick}
                      >
                        <Settings size={18} />
                        <span>Instellingen</span>
                      </Link>
                      
                      {user.isAdmin && (
                        <Link 
                          href="/dashboard/admin" 
                          className="user-dropdown-item"
                          onClick={handleLinkClick}
                        >
                          <User size={18} />
                          <span>Admin</span>
                        </Link>
                      )}
                      
                      <div className="user-dropdown-divider" />
                      
                      <button 
                        className="user-dropdown-item user-dropdown-logout"
                        onClick={handleLogout}
                      >
                        <LogOut size={18} />
                        <span>Uitloggen</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Not logged in - show login/register links
                <ul>
                  <li>
                    <Link href="/register">Registreer</Link>
                  </li>
                  <li>
                    <Link
                      href="/login"
                      className="crumina-button button--primary button--s button--hover-primary"
                    >
                      Login
                    </Link>
                  </li>
                </ul>
              )}
            </nav>

            <LanguageSwitcher />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
