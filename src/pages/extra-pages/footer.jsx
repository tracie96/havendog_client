import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../../assets/images/img/logo.svg';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';
import './footer.css';

export default function HomeFooter() {
  return (
    <footer className="footer">
      <div className="footer_top">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-md-6 col-lg-3">
              <div className="footer_widget">
                <div className="logo mb-3">
                  <Link to="/">
                    <img src={LogoImage} alt="Haven Pet Home Logo" width={200} />
                  </Link>
                </div>
                <p className="footer-text">
                  Rescue, Rehabilitate, Rehome: Giving Animals a Second Chance. We are dedicated to providing the best care for all pets.
                </p>
              </div>
            </div>
            
            <div className="col-xl-3 col-md-6 col-lg-3">
              <div className="footer_widget">
                <h3 className="footer_title">Quick Links</h3>
                <ul className="links">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about-us">About Us</Link></li>
                  <li><Link to="/contact-us">Contact Us</Link></li>
                  <li><Link to="/donate">Donate</Link></li>
                  <li><Link to="/up-for-adoption">Pet Adoption</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="col-xl-3 col-md-6 col-lg-3">
              <div className="footer_widget">
                <h3 className="footer_title">Contact Us</h3>
                <ul className="address_line">
                  <li><i className="fa fa-phone me-2"></i>+234 810-969-0608</li>
                  <li>
                    <a href="mailto:info@havenpethome.com">
                      <i className="fa fa-envelope me-2"></i>info@havenpethome.com
                    </a>
                  </li>
                  <li><i className="fa fa-map-marker me-2"></i>First Bank Building, Alagbon, Ikoyi, Lagos</li>
                </ul>
                <div className="social_links mt-4">
                  <a href="https://facebook.com/havenpethome_ng" target="_blank" rel="noopener noreferrer">
                    <FacebookOutlined className="social-icon" />
                  </a>
                  <a href="https://www.instagram.com/havenpethome_ng/" target="_blank" rel="noopener noreferrer">
                    <InstagramOutlined className="social-icon" />
                  </a>
               
                </div>
              </div>
            </div>
            
            <div className="col-xl-3 col-md-6 col-lg-3">
              <div className="footer_widget">
                <h3 className="footer_title">Our Services</h3>
                <ul className="links">
             
                  <li><Link to="/up-for-adoption">Pet Adoption</Link></li>
                
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="copy-right_text">
        <div className="container">
          <div className="bordered_1px"></div>
          <div className="row">
            <div className="col-xl-12 text-center py-3">
              <p className="copy_right">
                &copy; {new Date().getFullYear()} Haven Pet Home and Animal Care Foundation. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
