import React from 'react';
import LogoImage from '../../assets/images/img/logo.svg';

export default function HomeFooter() {
  return (
    <div>
      {' '}
      <footer class="footer">
        <div class="footer_top">
          <div class="container">
            <div class="row">
              <div class="col-xl-3 col-md-6 col-lg-3 ">
                <div class="footer_widget">
                  <div className="logo">
                    <a href="index.html">
                      <img src={LogoImage} alt="" width={300} />
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-xl-3  col-md-6 col-lg-3">
                <div class="footer_widget">
                  <ul class="links"></ul>
                </div>
              </div>
              <div class="col-xl-3 col-md-6 col-lg-3">
                <div class="footer_widget">
                  <h3 class="footer_title">Contact Us</h3>
                  <ul class="address_line">
                    <li>+234 810-969-0608</li>
                    <li>
                      <a href="#">Demomail@gmail.Com</a>
                    </li>
                    <li>700, Green Lane, New York, USA</li>
                  </ul>{' '}
                  <div class="socail_links">
                    <ul>
                      <li>
                        <a href="#">
                          <i class="ti-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="ti-pinterest"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-google-plus"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-linkedin"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-xl-3  col-md-6 col-lg-3">
                <div class="footer_widget">
                  <h3 class="footer_title">Our Servces</h3>
                  <ul class="links">
                    <li>
                      <a href="#">Pet Insurance</a>
                    </li>
                    <li>
                      <a href="#">Pet surgeries </a>
                    </li>
                    <li>
                      <a href="#">Pet Adoption</a>
                    </li>
                    <li>
                      <a href="#">Dog Insurance</a>
                    </li>
                    <li>
                      <a href="#">Dog Insurance</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="copy-right_text">
          <div class="container">
            <div class="bordered_1px"></div>
            <div class="row">
              <div class="col-xl-12"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
