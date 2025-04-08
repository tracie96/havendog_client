import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, message } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, SendOutlined } from '@ant-design/icons';
import HomeHeader from 'menu-items/header';
import HomeFooter from './footer';
import './contact-us.css';

const ContactUs = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

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
      
      {/* Banner Section */}
      <div className="breadcrumb_area">
        <div className="overlay_bg"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb_content text-center">
                <h2>Contact Us</h2>
                <p>Reach out to us with any questions or concerns about our pet care services</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact_section py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="contact_info_box shadow p-4 text-center">
                <PhoneOutlined style={{ fontSize: '36px', color: '#ff6b81', marginBottom: '15px' }} />
                <h4>Phone Number</h4>
                <p>+234 810-969-0608</p>
                <p>+234 811-222-3333</p>
              </div>
            </div>
            
            <div className="col-lg-4 mb-4">
              <div className="contact_info_box shadow p-4 text-center">
                <MailOutlined style={{ fontSize: '36px', color: '#ff6b81', marginBottom: '15px' }} />
                <h4>Email Address</h4>
                <p>info@havenpethome.com</p>
                <p>support@havenpethome.com</p>
              </div>
            </div>
            
            <div className="col-lg-4 mb-4">
              <div className="contact_info_box shadow p-4 text-center">
                <EnvironmentOutlined style={{ fontSize: '36px', color: '#ff6b81', marginBottom: '15px' }} />
                <h4>Our Location</h4>
                <p>15A, Ogbunike Street, Lekki Phase 1, Eti-Osa LGA</p>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-6 mb-4">
              <div className="contact_map">
                <iframe 
                  title="Google Maps - Haven Pet Home Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1016337.1386015502!2d3.1000948723233267!3d6.548055631029766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1654802273723!5m2!1sen!2sng" 
                  width="100%" 
                  height="450" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="contact_form shadow p-4">
                <h3 className="mb-4">Send Us a Message</h3>
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
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      loading={loading}
                      icon={<SendOutlined />}
                      style={{ 
                        background: '#ff6b81', 
                        borderColor: '#ff6b81',
                        height: '45px',
                        width: '180px',
                        fontSize: '16px'
                      }}
                    >
                      Send Message
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <HomeFooter />
    </>
  );
};

export default ContactUs; 