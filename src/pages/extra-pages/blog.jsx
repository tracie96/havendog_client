import HomeHeader from 'menu-items/header';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeFooter from './footer';
import Blackie from '../../assets/images/blog/blackiepic.jpg';
import HorseImage from '../../assets/images/blog/horses.jpg';
import RafaHorse from '../../assets/images/blog/rafa-horse.jpg';
import LogoImage from '../../assets/images/img/logo.svg';
// import 'antd/dist/antd.css';
import { Tabs, Tag } from 'antd'; // Import Ant Design's Tabs and Tag

const { TabPane } = Tabs;

const blogItems = [
  {
    date: '20 Sep, 2024',
    title: 'Meet Blackie: A Tale of Rescue and Hope',
    text: 'At Haven Dogs, every rescue has a story. Today, we`d like to introduce you to Blackie, a resilient 6-month-old pup who recently joined our family. Found in a carpenter`s shop in Lagos, Blackie had gone days without food. Thanks to our team`s swift action, she`s now healthy and seeking her forever home...',
    imgSrc: Blackie,
    link: '/blog/meet-blackie',
    tags: ['Dog Rescue', 'Adoption', 'Animal Welfare'],
    author: {
      name: 'Haven Dogs Team',
      role: 'Rescue Team',
      imgSrc: LogoImage
    }
  },
  {
    date: '3 Aug, 2024',
    title: 'Whiskers and Second Chances: A Tale of Cat Rescue',
    text: 'In a dimly lit alley, we discovered a colony of cats struggling to survive. This is the heartwarming journey of how we rescued, rehabilitated, and rehomed these feline friends...',
    imgSrc:
      'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    link: '/blog/cat-rescue',
    tags: ['Cat Rescue', 'Animal Welfare'],
    author: {
      name: 'Haven Dogs Team',
      role: 'Rescue Team',
      imgSrc: LogoImage
    }
  },
  {
    date: '15 Jul, 2024',
    title: 'Top Tips for First-Time Horse Owners in Nigeria',
    text: ' Whether you`re a first-time horse owner or looking to improve your horse care routine, these top tips will help you provide the best care for your horse...',
    imgSrc: HorseImage,
    link: '/blog/horse-ownership-tips',
    tags: ['Horse Care', 'Pet Ownership', 'Animal Welfare'],
    author: {
      name: 'Haven Dogs Team',
      role: 'Pet Care Experts',
      imgSrc: LogoImage
    }
  },
  {
    date: '23 Jul, 2024',
    title: 'Welcome Rafah to Haven Dogs: Top Tips for New Horse Owners',
    text: 'We are thrilled to announce a new addition to the Haven Dogs family – Rafah, a beautiful 2-year-old male horse from Gombe State, Nigeria. Rafah`s arrival presents an opportunity to share valuable insights with his new family and other aspiring horse owners...',
    imgSrc: RafaHorse,
    link: '/blog/welcome-rafah-horse-tips',
    tags: ['Horse Care', 'Pet Ownership', 'Haven Dogs News', 'Animal Welfare'],
    author: {
      name: 'Haven Dogs Team',
      role: 'Equine Care Specialists',
      imgSrc: LogoImage
    }
  }
];

const BlogSection = () => {
  const [selectedTag, setSelectedTag] = useState('All');

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const filteredItems = selectedTag === 'All' ? blogItems : blogItems.filter((item) => item.tags.includes(selectedTag));

  const allTags = ['All', ...new Set(blogItems.flatMap((item) => item.tags))];

  return (
    <>
      <HomeHeader />
      <section className="blog_area section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-5 mb-lg-0">
              <Tabs defaultActiveKey="1">
                <TabPane tab="Blog" key="1">
                  <div className="blog_left_sidebar">
                    <div class="row justify-content-center ">
                      <div class="col-lg-8 col-md-10">
                        <div class="section_title text-center mb-95" style={{ marginBottom: 0 }}>
                          <h2>Latest Stories</h2>
                          <h2 style={{ fontWeight: 'bold' }}>Animal Rescue Chronicles</h2>
                          <p>
                            Discover heartwarming tales of animal rescue, rehabilitation, and rehoming. Every story is a journey of hope and
                            compassion.
                          </p>
                        </div>
                        <div className="tag-container" style={{ marginBottom: '20px' }}>
                          {allTags.map((tag) => (
                            <Tag
                              key={tag}
                              onClick={() => handleTagClick(tag)}
                              style={{ cursor: 'pointer', margin: '5px', padding: '5px 10px' }}
                              color={selectedTag === tag ? '#FF0080' : ''}
                            >
                              {tag}
                            </Tag>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      {filteredItems.map((item, index) => (
                        <div className="col-md-6" key={index}>
                          <article className="blog_item" style={{ marginBottom: '30px' }}>
                            <div className="blog_item_img card-img rounded-0">
                              <img
                                className="card-img rounded-0"
                                src={item.imgSrc}
                                alt={item.title}
                                style={{ width: '100%', objectFit: 'cover', height: '250px' }}
                              />
                              <Link to={item.link} className="blog_item_date">
                                <h3>{item.date.split(' ')[0]}</h3>
                                <p>{item.date.split(' ')[1]}</p>
                              </Link>
                            </div>

                            <div className="blog_details">
                              <Link className="d-inline-block" to={item.link}>
                                <h2>{item.title}</h2>
                              </Link>
                              <p>{item.text}</p>
                              <ul className="blog-info-link">
                                <li>
                                  <Link to="#">
                                    <i className="fa fa-user"></i> {item.tags.join(', ')}
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#">
                                    <i className="fa fa-comments"></i> 03 Comments
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </article>
                        </div>
                      ))}
                    </div>

                    <nav className="blog-pagination justify-content-center d-flex">
                      <ul className="pagination">
                        <li className="page-item">
                          <Link to="#" className="page-link" aria-label="Previous">
                            <i className="ti-angle-left"></i>
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link to="#" className="page-link">
                            1
                          </Link>
                        </li>
                        <li className="page-item active">
                          <Link to="#" className="page-link">
                            2
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link to="#" className="page-link" aria-label="Next">
                            <i className="ti-angle-right"></i>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </TabPane>
                <TabPane tab="Instagram Feeds" key="2">
                  <div className="instagram_feeds">
                    <div class="elfsight-app-5a8e5a9d-838e-42bb-a739-e2f9b4dc55c4" data-elfsight-app-lazy style={{ color: '#fff' }}></div>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      <HomeFooter />
    </>
  );
};

export default BlogSection;
