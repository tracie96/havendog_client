import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'animate.css/animate.min.css';
import './home.css';
import HeaderImage from '../../assets/images/img/banner/dog.png';
import PetCare from '../../assets/images/img/about/pet_care.png';
import HomeHeader from 'menu-items/header';
import HomeFooter from './footer';

function HomePage() {
  return (
    <>
      <HomeHeader />

      {/* slider_area_start */}
      <div className="slider_area">
        <div className="single_slider slider_bg_1 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-6">
                <div className="slider_text">
                  <h3>
                    Haven Pet Home and <br /> <span>Animal Care Foundation</span>
                  </h3>
                  <p>Rescue, Rehabilitate, Rehome: Giving Animals a Second Chance.</p>
                  <br />
                  <a href="contact.html" className="boxed-btn4">
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="dog_thumb d-none d-lg-block">
            <img src={HeaderImage} alt="" />
          </div>
        </div>
      </div>

      <div className="pet_care_area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-6">
              <div className="cs-image-group">
                {/* Floating Box */}
                <div className="cs-box">
                  <img
                    className="cs-blob"
                    loading="lazy"
                    decoding="async"
                    src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Graphics/blob-shape3.svg"
                    alt="blob"
                    width="254"
                    height="238"
                    aria-hidden="true"
                  />
                  <span className="cs-number" style={{ zIndex: 99999 }}>
                    100%
                  </span>
                  <span className="cs-desc">Satisfaction Rating</span>
                </div>
                {/* Big Background Image */}
                <div className="cs-picture hidden" data-effect="slide-in-right">
                  {/* Mobile and Tablet Image */}
                  <img
                    loading="lazy"
                    decoding="async"
                    src="https://images.unsplash.com/photo-1575859225486-f377a3f867bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBldCUyMHBpbmt8ZW58MHx8MHx8fDA%3D"
                    alt="girl"
                    width="542"
                    height="720"
                    aria-hidden="true"
                  />
                </div>
                {/* Oval */}
                <img
                  className="cs-oval"
                  loading="lazy"
                  decoding="async"
                  src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Graphics/oval.svg"
                  alt="oval"
                  width="727"
                  height="480"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="col-lg-6 offset-lg-1 col-md-6">
              <div className="pet_info">
                <div className="section_title">
                  <h3>
                    <span>Welcome to Your </span> <br />
                    One-Stop Pet Care Destination
                  </h3>
                  <p>
                    At Haven Pet Home and Animal Care Foundation, we understand the unique needs of our beloved animal companions. Whether
                    you're seeking pet sitting services, veterinary recommendations, or exploring pet adoption options, our dedicated team
                    is here to provide you with comprehensive and compassionate solutions. We promise to treat your animals with the utmost
                    care, ensuring their well-being and happiness.
                  </p>
                  <a href="about.html" className="boxed-btn3">
                    About Us
                  </a>
                </div>

                <div className="checklist" style={{ marginTop: 10 }}>
                  <ul className="checkmark-list">
                    <li className="m-2">✔ Experienced and trusted animal care professionals.</li>
                    <li className="m-2">✔ Personalized services tailored to your pet's needs.</li>
                    <li className="m-2">✔ Comprehensive animal care solutions, all in one place.</li>
                    <li className="m-2">✔ Dedicated to promoting responsible pet ownership.</li>
                    <li className="m-2">✔ Committed to the well-being of all animals.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* service_area_start */}

      <div className="service_area">
        <div className="container">
          <div className="row justify-content-center ">
            <div className="col-lg-7 col-md-10">
              <div className="section_title text-center mb-95">
                <p>Services for every dog</p>
                <h2>Comprehensive Care for Your All Animals.</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <ul className="cs-card-group">
              <li className="cs-item hidden" data-effect="slideIn">
                <div href="/" className="cs-link">
                  <h3 className="cs-h3">
                    <span className="cs-span">Animal Sitting</span> Services
                  </h3>
                </div>
                <div className="cs-background">
                  {/* Mobile and Tablet Image */}
                  <img
                    decoding="async"
                    src="https://images.pexels.com/photos/6994718/pexels-photo-6994718.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="pet sitting"
                    width="305"
                    height="305"
                    aria-hidden="true"
                  />
                </div>
              </li>
              <li className="cs-item hidden" data-effect="slideIn">
                <div href="/" className="cs-link">
                  <h3 className="cs-h3">
                    <span className="cs-span">Veterinary</span> Recommendations
                  </h3>
                </div>
                <div className="cs-background">
                  {/* Mobile and Tablet Image */}
                  <img
                    decoding="async"
                    src="https://images.pexels.com/photos/6259885/pexels-photo-6259885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="veterinary recommendations"
                    width="305"
                    height="305"
                    aria-hidden="true"
                  />
                </div>
              </li>
              <li className="cs-item hidden" data-effect="slideIn">
                <div href="/" className="cs-link">
                  <h3 className="cs-h3">
                    <span className="cs-span">Pet</span> Adoption
                  </h3>
                </div>
                <div className="cs-background">
                  {/* Mobile and Tablet Image */}
                  <img
                    decoding="async"
                    src="https://images.unsplash.com/photo-1444212477490-ca407925329e?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="pet adoption"
                    width="305"
                    height="305"
                    aria-hidden="true"
                  />
                </div>
              </li>
              <li className="cs-item hidden" data-effect="slideIn">
                <div href="/" className="cs-link">
                  <h3 className="cs-h3">
                    <span className="cs-span">Pet</span> Education
                  </h3>
                </div>
                <div className="cs-background">
                  {/* Mobile and Tablet Image */}
                  <img
                    decoding="async"
                    src="https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="pet education"
                    width="305"
                    height="305"
                    aria-hidden="true"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* service_area_end */}

      {/* pet_care_area_end */}

      {/* adapt_area_start */}
      <div className="adapt_area">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-5">
              <div className="adapt_help">
                <div className="section_title">
                  <h3>
                    <span>Adopt From </span>
                    Us
                  </h3>
                  <p>
                    Lorem ipsum dolor sit , consectetur adipiscing elit, sed do iusmod tempor incididunt ut labore et dolore magna aliqua.
                    Quis ipsum suspendisse ultrices.
                  </p>
                  <a href="contact.html" className="boxed-btn3">
                    See Our Pets up for Adoption
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="adapt_about">
                <div className="row align-items-center">
                  <div className="col-lg-6 col-md-6">
                    <div className="single_adapt text-center">
                      <img src="img/adapt_icon/1.png" alt="" />
                      <div className="adapt_content">
                        <h3 className="counter">0</h3>
                        <p>Dogs Available</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="single_adapt text-center">
                      <img src="img/adapt_icon/3.png" alt="" />
                      <div className="adapt_content">
                        <h3>
                          <span className="counter">0</span>
                        </h3>
                        <p>Cats Available</p>
                      </div>
                    </div>
                    <div className="single_adapt text-center">
                      <img src="img/adapt_icon/2.png" alt="" />
                      <div className="adapt_content">
                        <h3>
                          <span className="counter">0</span>
                        </h3>
                        <p>Shelters Available</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="contact_anipat slider_bg_1">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="contact_text text-center">
                <div class="section_title text-center">
                  <h3>Why go with Us?</h3>
                  <p>
                    Every donation makes a difference, and we're dedicated 24/7 to ensuring your support reaches stray pets in need across
                    Nigeria.
                  </p>
                </div>
                <div class="contact_btn d-flex align-items-center justify-content-center">
                  <a href="contact.html" class="boxed-btn4">
                    Donate
                  </a>
                  <p>
                    Or <a href="#">+234 810-969-0608</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <HomeFooter />
    </>
  );
}

export default HomePage;
