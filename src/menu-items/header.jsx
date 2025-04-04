import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../assets/images/img/logo.svg';
function HomeHeader() {
  return (
    <header>
      <div className="header-area">
        <div className="header-top_area">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-8">
                <div className="short_contact_list">
                  <ul>
                    <li>
                      <a href="tel:+2348109690608">+234 810-969-0608</a>
                    </li>
                    <li>
                      <a href="mailto:info@havendogs.com">info@havendogs.com</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-4">
                <div className="social_media_links">
                  <a href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-pinterest-p"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-google-plus"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header Area */}
        <div id="sticky-header" className="main-header-area">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-3 col-lg-3">
                <div className="logo">
                  <Link to="/">
                    <img src={LogoImage} alt="Logo" width={150} />
                  </Link>
                </div>
              </div>
              <div className="col-xl-9 col-lg-9">
                <div className="main-menu d-none d-lg-block">
                  <nav>
                    <ul id="navigation">
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/about-us">About</Link>
                      </li>
                      <li>
                        <Link to="/blog">
                          Blog <i className="ti-angle-down"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="/donate">
                          Donate <i className="ti-angle-down"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="/up-for-adoption">
                          Up For Adoption <i className="ti-angle-down"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="/create-adoption">Create Adoption Listing</Link>
                      </li>

                      <li>
                        <Link to="/contact">Contact</Link>
                      </li>
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-12">
                <div className="mobile_menu d-block d-lg-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HomeHeader;
