import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/img/logo.svg';
import '../pages/extra-pages/home-landing.css';

export const HAVEN_NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about-us', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/donate', label: 'Donate' },
  { to: '/up-for-adoption', label: 'Adopt Now' },
  { to: '/pet-boarding', label: 'Boarding' },
  { to: '/pet-surrender', label: 'Surrender' },
  { to: '/contact-us', label: 'Contact' }
];

/**
 * Shared public site header matching the redesigned home landing.
 * Pass standalone={false} when already wrapped in `.haven-home`.
 */
function HavenSiteHeader({ standalone = true }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('.hh-menu-toggle')
      ) {
        setMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const content = (
    <>
      <div className="hh-topbar">
        <div className="hh-topbar-inner">
          <a href="tel:+2348109690608" className="hh-topbar-phone">
            +234 810-969-0608
          </a>
          <span className="hh-topbar-sep" aria-hidden="true">
            •
          </span>
          <span className="hh-topbar-address hh-topbar-address-full">
            First Bank Building, Alagbon, Ikoyi, Lagos
          </span>
          <span className="hh-topbar-address hh-topbar-address-short">Ikoyi, Lagos</span>
        </div>
      </div>

      <header className="hh-wrap hh-header">
        <div className="hh-header-inner">
          <Link to="/" className="hh-brand" onClick={closeMobile} aria-label="Haven Pet Home">
            <img src={logo} alt="" className="hh-logo" />
            <span className="hh-brand-text">
              <span className="hh-brand-name">Haven Pet Home</span>
              <span className="hh-brand-sub">Animal Care Foundation</span>
            </span>
          </Link>

          <nav className="hh-nav" aria-label="Primary">
            {HAVEN_NAV_LINKS.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hh-actions">
            <Link to="/pet-boarding" className="hh-btn hh-btn-outline hh-btn-hide-sm">
              Board Your Pet
            </Link>
            <Link to="/up-for-adoption" className="hh-btn hh-btn-solid hh-btn-hide-sm">
              Adopt Now
            </Link>
            <button
              type="button"
              className="hh-menu-toggle"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`hh-mobile-backdrop ${mobileOpen ? 'is-open' : ''}`} onClick={closeMobile} />
      <div ref={mobileMenuRef} className={`hh-mobile-menu ${mobileOpen ? 'is-open' : ''}`}>
        <div className="hh-mobile-menu-header">
          <div className="hh-brand hh-brand-static">
            <img src={logo} alt="" className="hh-mobile-logo" />
            <span className="hh-brand-text">
              <span className="hh-brand-name">Haven Pet Home</span>
              <span className="hh-brand-sub">Animal Care Foundation</span>
            </span>
          </div>
          <button type="button" className="hh-mobile-close" onClick={closeMobile} aria-label="Close menu">
            ×
          </button>
        </div>
        <nav>
          {HAVEN_NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} onClick={closeMobile}>
              {link.label}
            </Link>
          ))}
          <Link to="/login" onClick={closeMobile}>
            Login
          </Link>
        </nav>
      </div>
    </>
  );

  if (!standalone) {
    return content;
  }

  return <div className="haven-home haven-home--chrome-only">{content}</div>;
}

export default HavenSiteHeader;
