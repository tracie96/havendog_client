import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/img/logo.svg';
import '../pages/extra-pages/home-landing.css';

/**
 * Shared public site footer matching the redesigned home landing.
 * Pass standalone={false} when already wrapped in `.haven-home`.
 */
function HavenSiteFooter({ standalone = true }) {
  const content = (
    <footer className="hh-footer">
      <div className="hh-wrap hh-footer-grid">
        <div>
          <p className="hh-footer-brand">
            <img src={logo} alt="" className="hh-footer-logo" />
            <span className="hh-brand-text">
              <span className="hh-brand-name">Haven Pet Home</span>
              <span className="hh-brand-sub">Animal Care Foundation</span>
            </span>
          </p>
          <p className="hh-footer-note">
            Rescue · Rehabilitate · Rehome — Giving animals a second chance across Nigeria.
          </p>
        </div>
        <div>
          <p className="hh-footer-heading">Quick Links</p>
          <div className="hh-footer-links">
            <Link to="/">Home</Link>
            <Link to="/about-us">About Us</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact-us">Contact</Link>
            <Link to="/donate">Donate</Link>
          </div>
        </div>
        <div>
          <p className="hh-footer-heading">Services</p>
          <div className="hh-footer-links">
            <Link to="/up-for-adoption">Adopt Now</Link>
            <Link to="/pet-boarding">Pet Boarding</Link>
            <Link to="/pet-surrender">Pet Surrender</Link>
          </div>
        </div>
        <div>
          <p className="hh-footer-heading">Contact</p>
          <div className="hh-footer-links">
            <a href="tel:+2348109690608">+234 810-969-0608</a>
            <a href="mailto:info@havenpethome.com">info@havenpethome.com</a>
            <span>First Bank Building, Alagbon, Ikoyi, Lagos</span>
          </div>
        </div>
      </div>
      <div className="hh-wrap hh-footer-copy">
        &copy; {new Date().getFullYear()} Haven Pet Home and Animal Care Foundation. All Rights
        Reserved.
      </div>
    </footer>
  );

  if (!standalone) {
    return content;
  }

  return <div className="haven-home haven-home--chrome-only">{content}</div>;
}

export default HavenSiteFooter;
