import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fahida from '../assets/images/users/fahidaspassport.jpg';
import './BirthdayCelebration.css';

const STORAGE_KEY = 'fahida-birthday-2026-seen';
const CONFETTI = ['#d81b60', '#f48fb1', '#a80c5c', '#fff', '#f7b3cc', '#ffd6e7'];

const isBirthdayToday = () => {
  const today = new Date();
  return today.getMonth() === 9 && today.getDate() === 11;
};

function BirthdayCelebration() {
  const [open, setOpen] = useState(false);

  const close = () => {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setOpen(false);
  };

  useEffect(() => {
    if (!isBirthdayToday() || sessionStorage.getItem(STORAGE_KEY)) return;
    setOpen(true);
  }, []);

  if (!open) return null;

  return (
    <div className="bday-overlay" role="dialog" aria-modal="true" aria-labelledby="fahida-birthday-title">
      {CONFETTI.concat(CONFETTI, CONFETTI).map((color, index) => (
        <span
          key={`${color}-${index}`}
          className="bday-confetti"
          style={{
            left: `${(index * 17) % 100}%`,
            background: color,
            animationDelay: `${(index % 8) * 0.35}s`,
            animationDuration: `${3.6 + (index % 5) * 0.45}s`
          }}
        />
      ))}
      <div className="bday-card">
        <button type="button" className="bday-close" onClick={close} aria-label="Close birthday message">
          ×
        </button>
        <p className="bday-kicker">A Haven celebration</p>
        <h2 id="fahida-birthday-title">
          Happy Birthday
          <span>Fahida</span>
        </h2>
        <div className="bday-photo-wrap">
          <img src={fahida} alt="Fahida Emetumah" />
        </div>
        <p className="bday-role">Co-founder, Haven Pet Home</p>
        <p>
          Today we celebrate Fahida, whose compassion for animals shows in every rescue, every foster, and
          every life she fights to protect.
        </p>
        <div className="bday-actions">
          <Link to="/about-us#meet-fahida" onClick={close}>
            Read her story
          </Link>
          <button type="button" onClick={close}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default BirthdayCelebration;
