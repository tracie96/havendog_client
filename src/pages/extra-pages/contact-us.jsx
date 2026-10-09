import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Button, message } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, SendOutlined, MessageOutlined } from '@ant-design/icons';
import HomeHeader from 'menu-items/header';
import HomeFooter from './footer';
import './contact-us.css';

const ContactUs = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onFinish = (values) => {
    setLoading(true);
    // Here you would typically send the form data to your backend
    console.log('Form values:', values);
    
    // Simulate API call
    setTimeout(() => {
      message.success('Thank you for your message! We will get back to you soon.');
      form.resetFields();
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <HomeHeader />
      
      <main className="contact-page">
        <div className="contact-wrap">
          <div className="contact-hero">
            <p className="contact-kicker">Get in touch</p>
            <h1>
              Contact <span>Haven</span>
            </h1>
            <p>Reach out with any questions about adoption, boarding, surrender, or a visit to the shelter.</p>
          </div>

          <div className="contact-cards">
            <a className="contact-card" href="https://wa.me/2348109690608" target="_blank" rel="noreferrer">
              <span className="contact-card-icon">
                <MessageOutlined />
              </span>
              <h2>WhatsApp</h2>
              <p>+234 810-969-0608</p>
              <span className="contact-card-hint">Message us for a faster reply</span>
              <span className="contact-card-hint">from 9am - 8pm WAT</span>
            </a>
            <a className="contact-card" href="tel:+2348115977359">
              <span className="contact-card-icon">
                <PhoneOutlined />
              </span>
              <h2>Phone</h2>
              <p>+234 811-597-7359</p>
              <span className="contact-card-hint">Call only</span>
              <span className="contact-card-hint">from 9am - 8pm WAT</span>
            </a>
            <a className="contact-card" href="mailto:info@havenpethome.com">
              <span className="contact-card-icon">
                <MailOutlined />
              </span>
              <h2>Email</h2>
              <p>info@havenpethome.com</p>
              <span className="contact-card-hint">We reply by email</span>
            </a>
            <div className="contact-card">
              <span className="contact-card-icon">
                <EnvironmentOutlined />
              </span>
              <h2>Location</h2>
              <p>First Bank Building, Alagbon, Ikoyi, Lagos</p>
              <span className="contact-card-hint">Visit the shelter</span>
            </div>
          </div>

          <div className="contact-lower">
            <div className="contact-map">
              <iframe
                title="Google Maps - Haven Pet Home Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1016337.1386015502!2d3.1000948723233267!3d6.548055631029766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1654802273723!5m2!1sen!2sng"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="contact-form">
              <h2>Send us a message</h2>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item 
                        name="name" 
                        label="Full Name" 
                        rules={[{ required: true, message: 'Please enter your name' }]}
                      >
                        <Input placeholder="Enter your full name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item 
                        name="email" 
                        label="Email Address" 
                        rules={[
                          { required: true, message: 'Please enter your email' },
                          { type: 'email', message: 'Please enter a valid email' }
                        ]}
                      >
                        <Input placeholder="Enter your email address" />
                      </Form.Item>
                    </Col>
                  </Row>
                  
                  <Form.Item 
                    name="subject" 
                    label="Subject" 
                    rules={[{ required: true, message: 'Please enter a subject' }]}
                  >
                    <Input placeholder="Enter message subject" />
                  </Form.Item>
                  
                  <Form.Item 
                    name="message" 
                    label="Message" 
                    rules={[{ required: true, message: 'Please enter your message' }]}
                  >
                    <Input.TextArea rows={5} placeholder="Write your message here..." />
                  </Form.Item>
                  
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} icon={<SendOutlined />} className="contact-submit">
                      Send Message
                    </Button>
                  </Form.Item>
                </Form>
            </div>
          </div>
        </div>
      </main>

      <HomeFooter />
    </>
  );
};

export default ContactUs; 