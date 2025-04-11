import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { IoIosMenu } from "react-icons/io";

function HomeHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          !event.target.closest('.mobile-menu-toggle')) {
        closeMobileMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header>
      <div className="header-area">
        <div className="header-top_area d-none d-md-block">
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
              <div className="col-xl-3 col-lg-3 col-6">
                <div className="logo">
                  <Link to="/">
                    <img src={"https://res.cloudinary.com/tracysoft/image/upload/v1743752991/logo_fbifdp.svg"} alt="Logo" width={150} />
                  </Link>
                </div>
              </div>
              <div className="col-xl-9 col-lg-9 col-6">
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
                      {/* <li>
                        <Link to="/create-adoption">Create Adoption Listing</Link>
                      </li> */}

                      <li>
                        <Link to="/contact">Contact</Link>
                      </li>
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="mobile-menu-wrapper d-lg-none">
                  <button 
                   style={{border:'none', background:'none', float:'right'}}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                  >
                  <IoIosMenu fontSize={24}/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          ref={mobileMenuRef}
          className={`mobile-menu d-lg-none ${isMobileMenuOpen ? 'active' : ''}`}
        >
          <div className="mobile-menu-header">
            <button 
              className="close-menu-btn"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/" onClick={closeMobileMenu}>Home</Link>
              </li>
              <li>
                <Link to="/about-us" onClick={closeMobileMenu}>About</Link>
              </li>
              <li>
                <Link to="/blog" onClick={closeMobileMenu}>Blog</Link>
              </li>
              <li>
                <Link to="/donate" onClick={closeMobileMenu}>Donate</Link>
              </li>
              <li>
                <Link to="/up-for-adoption" onClick={closeMobileMenu}>Up For Adoption</Link>
              </li>
              <li>
                <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
              </li>
              <li>
                <Link to="/login" onClick={closeMobileMenu}>Login</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <style jsx>{`
        .header-top_area {
          padding: 10px 0;
          background: #f8f9fa;
        }

        .mobile-menu-toggle {
          background: none;
          border: none;
          padding: 10px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 24px;
          width: 30px;
        }

        .bar {
          width: 100%;
          height: 3px;
          background-color: #333;
          transition: all 0.3s ease;
        }

        .mobile-menu-header {
          display: flex;
          justify-content: flex-end;
          padding: 10px;
          border-bottom: 1px solid #eee;
        }

        .close-menu-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          padding: 5px 10px;
          color: #333;
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          left: -100%;
          width: 80%;
          height: 100vh;
          background: white;
          transition: left 0.3s ease;
          z-index: 1000;
          box-shadow: 2px 0 5px rgba(0,0,0,0.1);
        }

        .mobile-menu.active {
          left: 0;
        }

        .mobile-menu ul {
          list-style: none;
          padding: 20px;
          margin: 0;
        }

        .mobile-menu li {
          margin-bottom: 15px;
        }

        .mobile-menu a {
          color: #333;
          text-decoration: none;
          font-size: 16px;
          display: block;
          padding: 8px 0;
        }

        @media (max-width: 768px) {
          .logo img {
            width: 120px;
          }
        }

        @media (max-width: 576px) {
          .logo img {
            width: 100px;
          }
        }
      `}</style>
    </header>
  );
}

export default HomeHeader;
