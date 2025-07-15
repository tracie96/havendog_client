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
import {API_CONFIG, d} from '../../config/api';

const AboutUs = () => {
  const [adoptionData, setAdoptionData] = useState([]);

  useEffect(() => {
    fetchAdoptionData();
  }, []);

  const fetchAdoptionData = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.adoptions}`);
      setAdoptionData(response.data);
    } catch (error) {
      console.error('Error fetching adoption data:', error);
    }
  };

  // Helper function to get counts
  const getPetCounts = () => {
    const dogCount = adoptionData.length; // All pets from API are currently dogs
    const catCount = 0; // Currently no cats in the API
    const shelterCount = Array.from(new Set(adoptionData.map(pet => pet.location || ''))).length || 3;
    
    return { dogCount, catCount, shelterCount };
  };
  
  const { dogCount, catCount, shelterCount } = getPetCounts();

  return (
    <>
      <HomeHeader />
      <div className="pet_care_area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-3">
              <div className="pet_thumb">
                <img src={PetCare} alt="Pet Care" />
              </div>
              <div className="pet_thumb">
                <img src={PetCare_} alt="Pet Care" />
              </div>
            </div>
            <div className="col-lg-8 offset-lg-1 col-md-8">
              <div className="pet_info">
                <div className="section_title">
                  <h3>
                    <span>Haven Pet Home and </span> <br />
                    Animal Care Foundation
                  </h3>
                  <p>
                    Our mission is to rescue, rehabilitate, and find new homes for animals in need. We are a compassionate and dedicated
                    organization with a deep love for animals and a strong commitment to their well-being. Over the years, we have
                    demonstrated our passion for animal welfare through various endeavors, including rescuing abandoned pets, fostering
                    injured wildlife, and volunteering at local animal shelters. Our natural empathy and nurturing nature enable us to
                    connect with animals on a profound level, understanding their needs and providing them with the care and compassion they
                    deserve.
                  </p>
                  <h3>
                    <span>Our Initiatives</span> <br />
                  </h3>
                  <div className="checklist" style={{ marginTop: 10 }}>
                    <ul className="checkmark-list list-none p-0">
                      {[
                        {
                          title: 'SPAY & NEUTER PROGRAMS',
                          description: 'Controlling pet population through accessible sterilization services.',
                          link: '/spay-neuter'
                        },
                        {
                          title: 'SENIOR PROGRAMS',
                          description: 'Providing care and finding homes for older pets often overlooked in shelters.',
                          link: '/senior-programs'
                        },
                        {
                          title: 'INDIGENOUS DOG PROGRAMS',
                          description: 'Preserving and protecting native dog breeds and their habitats.',
                          link: '/indigenous-dog-programs'
                        },
                        {
                          title: 'STREET DOG PROGRAM',
                          description: 'Improving the lives of stray dogs through feeding, medical care, and adoption efforts.',
                          link: '/street-dog-program'
                        },
                        {
                          title: 'VACCINATION PROGRAM',
                          description: 'Preventing diseases in pets and strays through comprehensive vaccination drives.',
                          link: '/vaccination-program'
                        }
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3 mb-3 p-2 border-b border-gray-300">
                          <CheckCircleFilled className="text-green-500 text-lg" />
                          <strong className="block text-gray-900 " style={{ marginLeft: 10 }}>
                            {item.title}:
                          </strong>
                          <br />
                          <span className="text-gray-700">{item.description}</span>
                          <Link href={item.link} className="" style={{ marginLeft: 5, color: '#FF0080' }}>
                            Read More
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="adapt_area">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-5">
              <div className="adapt_help">
                <div className="section_title">
                  <h3>
                    <span>We need your</span> help Adopt Us
                  </h3>
                  <p>
                    Lorem ipsum dolor sit, consectetur adipiscing elit, sed do iusmod tempor incididunt ut labore et dolore magna aliqua.
                    Quis ipsum suspendisse ultrices.
                  </p>
                  <a href="contact.html" className="boxed-btn3">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="adapt_about">
                <div className="row align-items-center">
                  <div className="col-lg-6 col-md-6">
                    <div className="single_adapt text-center">
                      <MdOutlinePets color="#FF0080" fontSize={50} />
                      <div className="adapt_content">
                        <h3 className="counter">{catCount}</h3>
                        <p>Cats Available</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="single_adapt text-center">
                      <MdOutlinePets color="#FF0080" fontSize={50} />
                      <div className="adapt_content">
                        <h3>
                          <span className="counter">{dogCount}</span>
                        </h3>
                        <p>Dogs Available</p>
                      </div>
                    </div>
                    <div className="single_adapt text-center">
                      <MdOutlinePets />
                      <div className="adapt_content">
                        <h3 className="counter">{shelterCount}</h3>
                        <p>Shelters</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container box_1170">
        <div className="section-top-border">
          <div className="row">
            <div className="col-md-3">
              <div className="thumb">
                <img aria-hidden="true" loading="lazy" decoding="async" src={fahida} className="img-fluid" alt="Fahida Emetumah" />
              </div>
            </div>
            <div className="col-md-9 mt-sm-20">
              <div className="mt-4">
                <p className="text-gray-400">Co-Founder</p>
                <h2 className="text-2xl font-semibold">Meet Fahida</h2>
              </div>
              <p className="text-gray-300 mt-3">
                Fahida is a compassionate and dedicated individual with a deep love for animals. Over the years, she has demonstrated her
                passion for animal welfare through various endeavors, including rescuing abandoned pets, fostering injured wildlife, and
                volunteering at local animal shelters.
              </p>
              <p className="text-gray-300 mt-3">
                Her empathy and nurturing nature enable her to connect with animals on a profound level, understanding their needs and
                providing them with the care they deserve. She is driven by a desire to make a positive impact in the lives of animals,
                advocating for their rights and working tirelessly to create a better world for them.
              </p>
            </div>
          </div>
        </div>
        <div className="section-top-border text-right">
          <div className="row">
            <div className="col-md-9">
              <div className="mt-4">
                <p className="text-gray-400 text-right">Co-Founder</p>
                <h2 className="text-2xl font-semibold text-right">Meet Tracy</h2>
              </div>
              <p className="text-gray-300 mt-3">
                Tracy is a dedicated and passionate individual with a profound commitment to animal welfare. Throughout her career, she has
                consistently demonstrated her love for animals through various initiatives, including organizing community-wide pet adoption
                events, implementing educational programs on responsible pet ownership, and collaborating with veterinarians to provide
                affordable care for pets in need.
              </p>
              <p className="text-gray-300 mt-3">
                Her innovative approach to animal welfare and ability to build strong partnerships have been instrumental in expanding the
                reach and impact of our organization. Tracy&apos;s leadership continues to drive our mission forward, inspiring others to create
                a world where every animal is treated with kindness and respect.
              </p>
            </div>
            <div className="col-md-3">
              <div className="thumb">
                <img aria-hidden="true" loading="lazy" decoding="async" src={tracy} className="img-fluid" alt="Tracy Anele" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="adapt_area">
        <div className="container">
          <div className="">
            <h1 className="cs-title">Who We Are</h1>
            <p>
              Haven Pet Home and Animal Care Foundation is a non-profit organization dedicated to the rescue, rehabilitation, and adoption
              of animals in need. We are a team of passionate individuals who share a deep love for animals and a commitment to their
              well-being.
            </p>
            <p>
              Our organization was founded on the belief that every animal deserves a loving home and a second chance at life. We work
              tirelessly to provide medical care, shelter, and rehabilitation to abandoned, abused, or neglected animals, helping them heal
              both physically and emotionally.
            </p>
            <p>
              Our team consists of dedicated volunteers, veterinarians, and animal care professionals who work hand in hand to ensure the
              highest level of care and attention for every animal that comes through our doors. We are committed to finding forever homes
              for our rescued animals, carefully matching them with loving families who can provide them with the care and support they
              need.
            </p>
          </div>
        </div>
      </div>
      <div className="service_area">
        <div className="container">
          <div className="row justify-content-center ">
            <div className="col-lg-7 col-md-10">
              <div className="section_title text-center mb-95">
                <h3>Our Core Values</h3>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-3">
              <div className="single_service">
                <div className=" service_icodn_bg_1 d-flex align-items-center justify-content-center">
                  <div className="">
                    <MdOutlinePets color="#FF0080" fontSize={50} />
                  </div>
                </div>
                <div className="service_content text-center">
                  <h3>Compassion</h3>
                  <p>We treat every animal with kindness, empathy, and respect.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3">
              <div className="single_service active">
                <div className=" service_icodn_bg_1 d-flex align-items-center justify-content-center">
                  <div className="">
                    <MdOutlinePets color="#FF0080" fontSize={50} />
                  </div>
                </div>
                <div className="service_content text-center">
                  <h3>Dedication</h3>
                  <p> We strive to educate the community about responsible pet ownership and the importance of animal welfare.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3">
              <div className="single_service">
                <div className=" service_icodn_bg_1 d-flex align-items-center justify-content-center">
                  <div className="">
                    <MdOutlinePets color="#FF0080" fontSize={50} />
                  </div>
                </div>
                <div className="service_content text-center">
                  <h3>Education</h3>
                  <p>We work closely with other animal welfare organizations, veterinarians, and the community to achieve our goals.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3">
              <div className="single_service">
                <div className=" service_icodn_bg_1 d-flex align-items-center justify-content-center">
                  <div className="">
                    <MdOutlinePets color="#FF0080" fontSize={50} />
                  </div>
                </div>
                <div className="service_content text-center">
                  <h3>Collaboration</h3>
                  <p>We work closely with other animal welfare organizations, veterinarians, and the community to achieve our goals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HomeFooter />
    </>
  );
};

export default AboutUs;
