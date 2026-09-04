import HomeHeader from 'menu-items/header';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeFooter from './footer';
import Blackie from '../../assets/images/blog/blackiepic.jpg';
import HorseImage from '../../assets/images/blog/horses.jpg';
import RafaHorse from '../../assets/images/blog/rafa-horse.jpg';
import { Tabs, Tag } from 'antd';
import './blog.css';

const { TabPane } = Tabs;

const blogItems = [
  {
    date: '20 Sep, 2024',
    title: 'Meet Blackie: A Tale of Rescue and Hope',
    text: "At Haven Dogs, every rescue has a story. Today, we'd like to introduce you to Blackie, a resilient 6-month-old pup who recently joined our family. Found in a carpenter's shop in Lagos, Blackie had gone days without food. Thanks to our team's swift action, she's now healthy and seeking her forever home...",
    imgSrc: Blackie,
    link: '/blog/meet-blackie',
    tags: ['Dog Rescue', 'Adoption', 'Animal Welfare']
  },
  {
    date: '3 Aug, 2024',
    title: 'Whiskers and Second Chances: A Tale of Cat Rescue',
    text: 'In a dimly lit alley, we discovered a colony of cats struggling to survive. This is the heartwarming journey of how we rescued, rehabilitated, and rehomed these feline friends...',
    imgSrc:
      'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    link: '/blog/cat-rescue',
    tags: ['Cat Rescue', 'Animal Welfare']
  },
  {
    date: '15 Jul, 2024',
    title: 'Top Tips for First-Time Horse Owners in Nigeria',
    text: "Whether you're a first-time horse owner or looking to improve your horse care routine, these top tips will help you provide the best care for your horse...",
    imgSrc: HorseImage,
    link: '/blog/horse-ownership-tips',
    tags: ['Horse Care', 'Pet Ownership', 'Animal Welfare']
  },
  {
    date: '23 Jul, 2024',
    title: 'Welcome Rafah to Haven Dogs: Top Tips for New Horse Owners',
    text: "We are thrilled to announce a new addition to the Haven Dogs family – Rafah, a beautiful 2-year-old male horse from Gombe State, Nigeria. Rafah's arrival presents an opportunity to share valuable insights with his new family and other aspiring horse owners...",
    imgSrc: RafaHorse,
    link: '/blog/welcome-rafah-horse-tips',
    tags: ['Horse Care', 'Pet Ownership', 'Haven Dogs News', 'Animal Welfare']
  }
];

const BlogSection = () => {
  const [selectedTag, setSelectedTag] = useState('All');

  const filteredItems =
    selectedTag === 'All' ? blogItems : blogItems.filter((item) => item.tags.includes(selectedTag));

  const allTags = ['All', ...new Set(blogItems.flatMap((item) => item.tags))];

  const renderPosts = () => {
    if (filteredItems.length === 0) {
      return <div className="blog-empty">No stories match this tag yet.</div>;
    }

    return (
      <div className="blog-grid">
        {filteredItems.map((item) => {
          const [day, month] = item.date.replace(',', '').split(' ');
          return (
            <article className="blog-card" key={item.link}>
              <Link to={item.link} className="blog-card-media">
                <img src={item.imgSrc} alt={item.title} loading="lazy" />
                <span className="blog-card-date">
                  <strong>{day}</strong>
                  <span>{month}</span>
                </span>
              </Link>
              <div className="blog-card-body">
                <Link to={item.link}>
                  <h2>{item.title}</h2>
                </Link>
                <p>{item.text}</p>
                <div className="blog-card-meta">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <HomeHeader />
      <main className="blog-page">
        <div className="blog-wrap">
          <div className="blog-hero">
            <p className="blog-kicker">Latest Stories</p>
            <h1 className="blog-title">
              Animal Rescue <span>Chronicles</span>
            </h1>
            <p className="blog-lead">
              Discover heartwarming tales of animal rescue, rehabilitation, and rehoming. Every story is
              a journey of hope and compassion.
            </p>
          </div>

          <Tabs defaultActiveKey="1" className="blog-tabs">
            <TabPane tab="Blog" key="1">
              <div className="blog-tags">
                {allTags.map((tag) => (
                  <Tag
                    key={tag}
                    className={`blog-tag${selectedTag === tag ? ' is-active' : ''}`}
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
              {renderPosts()}
            </TabPane>
            <TabPane tab="Instagram Feeds" key="2">
              <div className="blog-instagram">
                <div
                  className="elfsight-app-5a8e5a9d-838e-42bb-a739-e2f9b4dc55c4"
                  data-elfsight-app-lazy
                />
              </div>
            </TabPane>
          </Tabs>
        </div>
      </main>
      <HomeFooter />
    </>
  );
};

export default BlogSection;
