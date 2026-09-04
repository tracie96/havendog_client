import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_CONFIG } from '../../config/api';
import heroPets from '../../assets/hero-pets.jpg';
import HavenSiteHeader from 'components/HavenSiteHeader';
import HavenSiteFooter from 'components/HavenSiteFooter';
import './home-landing.css';

function HomePage() {
  const [adoptionData, setAdoptionData] = useState([]);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchAdoptionData = async () => {
      try {
        const response = await axios.get(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.adoptions}`);
        const availablePets = response.data.filter(
          (pet) => pet.status !== 'adopted' && !pet.isAdopted
        );
        setAdoptionData(availablePets);
      } catch (error) {
        console.error('Error fetching adoption data:', error);
      }
    };

    fetchAdoptionData();
  }, []);

  const dogCount = adoptionData.length;
  const catCount = 0;
  const shelterCount = 0;

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="haven-home">
      <HavenSiteHeader standalone={false} />

      <section className="hh-wrap hh-hero">
        <div className="hh-hero-grid">
          <div className="hh-hero-copy-block">
            <span className="hh-eyebrow">Giving Animals a Second Chance</span>
            <h1 className="hh-hero-title">
              Your <span className="hh-chrome">One-Stop</span> Pet Care Destination
            </h1>
            <p className="hh-hero-copy hh-hero-copy-short">
              Sitting, boarding, and adoption — compassionate care for your pets, all in one place.
            </p>
            <p className="hh-hero-copy hh-hero-copy-full">
              At Haven Pet Home and Animal Care Foundation, we treat your animal companions with the
              utmost care — from sitting services to adoption, all in one compassionate place.
            </p>
            <div className="hh-cta-row">
              <Link to="/up-for-adoption" className="hh-btn hh-btn-solid hh-btn-lg">
                Adopt Now
              </Link>
              <Link to="/pet-boarding" className="hh-btn hh-btn-outline hh-btn-lg">
                Board Your Pet
              </Link>
            </div>
            <div className="hh-rating">
              <span className="hh-rating-dot" aria-hidden="true" />
              100% Satisfaction Rating
            </div>
          </div>

          <div className="hh-hero-media">
            <div className="hh-hero-frame">
              <img
                src={heroPets}
                alt="A happy golden retriever and tabby cat at Haven Pet Home shelter"
                width={1080}
                height={1200}
                loading="eager"
              />
            </div>
            <div className="hh-hero-badge">
              <strong>24/7</strong>
              <span>Compassionate Care</span>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="hh-wrap hh-section-card">
        <div className="hh-about-grid">
          <h2 className="hh-section-title">About Us</h2>
          <p className="hh-section-copy">
            Whether you&apos;re seeking pet sitting, veterinary recommendations, or exploring adoption,
            our dedicated team provides comprehensive and compassionate solutions for your beloved
            companions.
          </p>
        </div>
        <div className="hh-checklist">
          <div className="hh-check">
            <span>✔</span>
            <p>Experienced and trusted animal care professionals.</p>
          </div>
          <div className="hh-check">
            <span>✔</span>
            <p>Personalized services tailored to your pet&apos;s needs.</p>
          </div>
          <div className="hh-check">
            <span>✔</span>
            <p>Comprehensive animal care solutions, all in one place.</p>
          </div>
          <div className="hh-check">
            <span>✔</span>
            <p>Dedicated to promoting responsible pet ownership.</p>
          </div>
          <div className="hh-check">
            <span>✔</span>
            <p>Committed to the well-being of all animals.</p>
          </div>
        </div>
      </section>

      <section id="services" className="hh-wrap hh-services">
        <p className="hh-kicker">Services for every dog</p>
        <h2 className="hh-services-title">
          Comprehensive Care for Your <span className="hh-chrome">All Animals</span>
        </h2>
        <div className="hh-service-grid">
          <div className="hh-service">
            <div className="hh-service-icon" aria-hidden="true">
              🐕
            </div>
            <h3>Animal Sitting</h3>
            <p>Safe, loving supervision while you&apos;re away.</p>
          </div>
          <div className="hh-service">
            <div className="hh-service-icon" aria-hidden="true">
              🩺
            </div>
            <h3>Veterinary Recommendations</h3>
            <p>Trusted vet guidance for every pet.</p>
          </div>
          <div className="hh-service">
            <div className="hh-service-icon" aria-hidden="true">
              🏡
            </div>
            <h3>Pet Adoption</h3>
            <p>Match rehabilitated pets with homes.</p>
          </div>
          <div className="hh-service">
            <div className="hh-service-icon" aria-hidden="true">
              📚
            </div>
            <h3>Pet Education</h3>
            <p>Learn to care for your new companion.</p>
          </div>
        </div>
      </section>

      <section id="adopt" className="hh-wrap hh-adopt">
        <div className="hh-adopt-panel">
          <div className="hh-adopt-copy">
            <p className="hh-kicker">Adopt From Us</p>
            <h2>Give a loving home to an animal in need.</h2>
            <p>
              Our adoption process connects pets with caring families after thorough health checks
              and rehabilitation. Each adoption helps us rescue more animals from challenging
              situations.
            </p>
            <Link to="/up-for-adoption" className="hh-btn hh-btn-ghost hh-btn-lg hh-adopt-cta">
              Adopt Now
            </Link>
          </div>
          <div className="hh-stats">
            <div className="hh-stat">
              <strong>{dogCount}</strong>
              <span>Pets Available</span>
            </div>
          </div>
        </div>
      </section>

      <section id="donate" className="hh-wrap hh-donate">
        <div className="hh-donate-panel">
          <p className="hh-kicker">Why go with Us?</p>
          <h2>Every donation makes a difference.</h2>
          <p>
            We&apos;re dedicated 24/7 to ensuring your support reaches stray pets in need across Nigeria.
          </p>
          <div className="hh-donate-actions">
            <Link to="/donate" className="hh-btn hh-btn-solid hh-btn-lg">
              Donate
            </Link>
            <p>
              Or call us at{' '}
              <a href="tel:+2348109690608" className="hh-phone">
                +234 810-969-0608
              </a>
            </p>
          </div>

          <div id="subscribe" className="hh-subscribe">
            <p>Get notified when a pet is up for adoption</p>
            {subscribed ? (
              <p className="hh-subscribe-success">
                You&apos;re subscribed! We&apos;ll notify you when a new pet is ready for a home.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="hh-subscribe-form">
                <label htmlFor="haven-home-email" className="hh-sr-only">
                  Email address
                </label>
                <input
                  id="haven-home-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                />
                <button type="submit">Subscribe</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <HavenSiteFooter standalone={false} />
    </div>
  );
}

export default HomePage;
