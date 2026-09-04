import React, { useState, useEffect } from 'react';
import PetCare from '../../assets/images/img/dog-cat.jpg';
import PetCare_ from '../../assets/images/img/dog-2.jpg';
import fahida from '../../assets/images/users/fahidaspassport.jpg';
import tracy from '../../assets/images/users/tracysprofile.jpg';
import { MdOutlinePets } from 'react-icons/md';
import HomeHeader from 'menu-items/header';
import { CheckCircleFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import HomeFooter from './footer';
import axios from 'axios';
import { API_CONFIG } from '../../config/api';
import './about-us.css';

const INITIATIVES = [
  {
    title: 'Spay & Neuter Programs',
    description: 'Controlling pet population through accessible sterilization services.'
  },
  {
    title: 'Senior Programs',
    description: 'Providing care and finding homes for older pets often overlooked in shelters.'
  },
  {
    title: 'Indigenous Dog Programs',
    description: 'Preserving and protecting native dog breeds and their habitats.'
  },
  {
    title: 'Street Dog Program',
    description: 'Improving the lives of stray dogs through feeding, medical care, and adoption efforts.'
  },
  {
    title: 'Vaccination Program',
    description: 'Preventing diseases in pets and strays through comprehensive vaccination drives.'
  }
];

const VALUES = [
  {
    title: 'Compassion',
    description: 'We treat every animal with kindness, empathy, and respect.'
  },
  {
    title: 'Dedication',
    description: 'We work tirelessly to rescue, rehabilitate, and rehome animals in need.'
  },
  {
    title: 'Education',
    description: 'We teach responsible pet ownership and the importance of animal welfare.'
  },
  {
    title: 'Collaboration',
    description: 'We partner with vets, shelters, and the community to expand our impact.'
  }
];

const AboutUs = () => {
  const [adoptionData, setAdoptionData] = useState([]);

  useEffect(() => {
    const fetchAdoptionData = async () => {
      try {
        const response = await axios.get(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.adoptions}`);
        setAdoptionData(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching adoption data:', error);
      }
    };

    fetchAdoptionData();
  }, []);

  const availablePets = adoptionData.filter(
    (pet) => pet.status !== 'adopted' && !pet.isAdopted
  );
  const dogCount = availablePets.length;
  const catCount = 0;
  const shelterCount = 1;

  return (
    <>
      <HomeHeader />
      <main className="about-page">
        <section className="about-wrap about-hero">
          <div className="about-hero-media">
            <img src={PetCare} alt="Dogs and cats at Haven Pet Home" />
            <img src={PetCare_} alt="A rescued dog at Haven Pet Home" />
          </div>
          <div className="about-hero-copy">
            <p className="about-kicker">About Us</p>
            <h1 className="about-title">
              <span>Haven Pet Home</span> and Animal Care Foundation
            </h1>
            <p className="about-lead">
              Our mission is to rescue, rehabilitate, and find new homes for animals in need. We are a
              compassionate organization with a deep love for animals and a strong commitment to their
              well-being — through rescue, fostering, rehabilitation, and adoption.
            </p>
          </div>
        </section>

        <section className="about-wrap about-section">
          <h2 className="about-section-title">Our Initiatives</h2>
          <div className="about-initiatives">
            {INITIATIVES.map((item) => (
              <div className="about-initiative" key={item.title}>
                <CheckCircleFilled className="check" />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="about-wrap about-section">
          <div className="about-help">
            <div>
              <p className="about-kicker">Get Involved</p>
              <h2 className="about-title">We need your help to give them a home</h2>
              <p className="about-lead">
                Every adoption, donation, and volunteer hour helps us rescue more animals and keep our
                shelters running with care.
              </p>
              <Link to="/contact-us" className="about-help-btn">
                Contact Us
              </Link>
            </div>
            <div className="about-stats">
              <div className="about-stat">
                <strong>{dogCount}</strong>
                <span>Dogs Available</span>
              </div>
              <div className="about-stat">
                <strong>{catCount}</strong>
                <span>Cats Available</span>
              </div>
              <div className="about-stat">
                <strong>{shelterCount}</strong>
                <span>Shelters</span>
              </div>
            </div>
          </div>
        </section>

        <section className="about-wrap about-section">
          <h2 className="about-section-title">Our Founders</h2>
          <div className="about-founders">
            <article className="about-founder">
              <div className="about-founder-media">
                <img src={fahida} alt="Fahida Emetumah" loading="lazy" />
              </div>
              <div className="about-founder-copy">
                <p className="about-founder-role">Co-Founder</p>
                <h3>Meet Fahida</h3>
                <p>
                  Fahida is a compassionate and dedicated individual with a deep love for animals. Over
                  the years, she has demonstrated her passion for animal welfare through rescuing
                  abandoned pets, fostering injured wildlife, and volunteering at local animal shelters.
                </p>
                <p>
                  Her empathy and nurturing nature help her connect with animals on a profound level,
                  advocating for their rights and working tirelessly to create a better world for them.
                </p>
              </div>
            </article>

            <article className="about-founder">
              <div className="about-founder-media">
                <img src={tracy} alt="Tracy Anele" loading="lazy" />
              </div>
              <div className="about-founder-copy">
                <p className="about-founder-role">Co-Founder</p>
                <h3>Meet Tracy</h3>
                <p>
                  Tracy is a dedicated leader with a profound commitment to animal welfare. She has
                  organized community pet adoption events, built educational programs on responsible pet
                  ownership, and partnered with veterinarians to expand affordable care.
                </p>
                <p>
                  Her leadership continues to drive our mission forward, inspiring others to create a
                  world where every animal is treated with kindness and respect.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="about-wrap about-section">
          <h2 className="about-section-title">Who We Are</h2>
          <div className="about-who">
            <p>
              Haven Pet Home and Animal Care Foundation is a non-profit organization dedicated to the
              rescue, rehabilitation, and adoption of animals in need. We are a team of passionate
              people who share a deep love for animals and a commitment to their well-being.
            </p>
            <p>
              We were founded on the belief that every animal deserves a loving home and a second
              chance at life. We provide medical care, shelter, and rehabilitation to abandoned,
              abused, or neglected animals, helping them heal physically and emotionally.
            </p>
            <p>
              Our volunteers, veterinarians, and animal care professionals work together to ensure the
              highest level of care for every animal — and carefully match each one with a forever
              family.
            </p>
          </div>
        </section>

        <section className="about-wrap about-section about-section-last">
          <div className="about-values-head">
            <p className="about-kicker">What Guides Us</p>
            <h2 className="about-section-title">Our Core Values</h2>
          </div>
          <div className="about-values">
            {VALUES.map((value) => (
              <div className="about-value" key={value.title}>
                <div className="about-value-icon" aria-hidden="true">
                  <MdOutlinePets />
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <HomeFooter />
    </>
  );
};

export default AboutUs;
