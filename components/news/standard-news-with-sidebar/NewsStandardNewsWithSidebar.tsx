'use client';

import React from 'react';
import Link from 'next/link';
import BlogPost from '../BlogPost';
import BlogPostVideo from '../BlogPostVideo';
import BlogPostQuote from '../BlogPostQuote';
import BlogPostAudio from '../BlogPostAudio';
import BlogPostGallery from '../BlogPostGallery';
import BlogPostLink from '../BlogPostLink';
import post7 from '@/assets/img/post7.jpg';
import post8 from '@/assets/img/post8.jpg';
import post9 from '@/assets/img/post9.jpg';
import post10 from '@/assets/img/post10.jpg';
import post11 from '@/assets/img/post11.jpg';
import post12 from '@/assets/img/post12.jpg';
import { StaticImageData } from 'next/image';
import Pagination from '../../candidates/candidate-lists/Pagination';

type BlogPostType =
  | {
      type: 'standard';
      title: string;
      categories: string[];
      content: string;
      image?: StaticImageData;
      date: string;
      comments: number;
      isLarge?: boolean;
    }
  | {
      type: 'video';
      title: string;
      categories: string[];
      content: string;
      image: StaticImageData;
      date: string;
      comments: number;
      videoUrl: string;
    }
  | {
      type: 'quote';
      quote: string;
      author: string;
      role: string;
    }
  | {
      type: 'audio';
      title: string;
      categories: string[];
      content: string;
      date: string;
      comments: number;
      soundcloudUrl: string;
    }
  | {
      type: 'gallery';
      title: string;
      categories: string[];
      content: string;
      images: StaticImageData[];
      date: string;
      comments: number;
      isLarge?: boolean;
    }
  | {
      type: 'link';
      title: string;
      link: string;
      site: string;
    };

const blogPosts: BlogPostType[] = [
  {
    type: 'standard',
    title: 'Attached: The Important & Standard Post Format',
    categories: ['Startup', 'Business'],
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolor.',
    image: post7,
    date: '8 December 2018',
    comments: 6,
    isLarge: true
  },
  {
    type: 'standard',
    title: 'Simple Post with Featured Image',
    categories: ['Business'],
    content: 'Ut enim ad minim aliquip veniam, quis aliquip nostrud aliquip exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: post8,
    date: '26 November 2018',
    comments: 0
  },
  {
    type: 'video',
    title: 'YouTube Video Post Format',
    categories: ['Marketing'],
    content: 'Ut enim ad minim aliquip veniam, quis aliquip nostrud aliquip exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: post9,
    date: '14 November 2018',
    comments: 7,
    videoUrl: 'https://www.youtube.com/watch?v=wnJ6LuUFpMo'
  },
  {
    type: 'quote',
    quote: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat velit esse cillum dolore.',
    author: 'Angelina Johnson',
    role: 'Graphic Designer'
  },
  {
    type: 'audio',
    title: 'SoundCloud Audio Post Format',
    categories: ['Creative'],
    content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    date: '30 October 2018',
    comments: 238,
    soundcloudUrl: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/392732244&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'
  },
  {
    type: 'link',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    link: '#',
    site: 'crumina.net'
  },
  {
    type: 'gallery',
    title: 'Photo Gallery Post Format',
    categories: ['Photography', 'Art'],
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolor.',
    images: [post10, post10, post10, post10],
    date: '23 October 2018',
    comments: 6,
    isLarge: true
  },
  {
    type: 'standard',
    title: 'Simple Post with Featured Image',
    categories: ['Startup'],
    content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    image: post11,
    date: '13 September 2018',
    comments: 46
  },
  {
    type: 'video',
    title: 'Standard Video Post Format',
    categories: ['Creative'],
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: post12,
    date: '22 August 2018',
    comments: 2,
    videoUrl: 'https://www.youtube.com/watch?v=wnJ6LuUFpMo'
  },
  {
    type: 'standard',
    title: 'Simple Post without Featured Image',
    categories: ['Business'],
    content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: '7 August 2018',
    comments: 0
  }
];

const renderBlogPost = (post: BlogPostType, index: number) => {
  switch (post.type) {
    case 'video':
      return <BlogPostVideo key={index} {...post} />;
    case 'quote':
      return <BlogPostQuote key={index} {...post} />;
    case 'audio':
      return <BlogPostAudio key={index} {...post} />;
    case 'gallery':
      return <BlogPostGallery key={index} {...post} />;
    case 'link':
      return <BlogPostLink key={index} {...post} />;
    default:
      return <BlogPost key={index} {...post} />;
  }
};

const NewsStandardNewsWithSidebar: React.FC = () => {
  return (
    <div className="main-content-wrapper">
      <div className="header--spacer" style={{ height: '142.234px', backgroundColor: 'rgb(18, 18, 20)' }}></div>
      <section className="stunning-header stunning-bg3 pb120 pt80">
        <div className="overlay overlay-stunning"></div>
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <ul className="breadcrumbs">
                <li className="breadcrumbs-item">
                  <Link href="/">Home<i className="puzzle-icon fal fa-angle-double-right"></i></Link>
                </li>
                <li className="breadcrumbs-item active">
                  <span>News</span>
                </li>
              </ul>
              <h1 className="page-title text-white">Read our blog</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light-grey medium-padding120">
        <div className="container">
          <div className="row mb20">
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
              <div>
                {blogPosts.map((post, index) => renderBlogPost(post, index))}
              </div>
              <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 mt-4 mt-lg-0">
              <div className="crumina-sticky-sidebar">
                <div className="sidebar__inner">
                  <aside aria-label="sidebar" className="sidebar sidebar-right">
                    <div className="widget w-info widget-sidebar">
                      <Link href="/" className="site-logo">
                        <img className="puzzle-icon" src="/img/svg/02_logo_dark.svg" alt="logo" width="120" />
                      </Link>
                      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est.</p>
                      <Link href="/how-it-works" className="crumina-button button--dark button--m">How it works?</Link>
                    </div>
                    <div className="widget w-search widget-sidebar">
                      <h4 className="widget-title">What are you looking for?</h4>
                      <div className="input--with-icon input--icon-right">
                        <input id="search" name="search" placeholder="Search" type="text" />
                        <i className="puzzle-icon fal fa-search"></i>
                      </div>
                    </div>
                    <div className="widget widget_links widget-sidebar">
                      <h4 className="widget-title">Categories</h4>
                      <ul>
                        <li><Link href="#">Startup</Link></li>
                        <li><Link href="#">Business</Link></li>
                        <li><Link href="#">Marketing</Link></li>
                        <li><Link href="#">Creative</Link></li>
                        <li><Link href="#">Photography</Link></li>
                        <li><Link href="#">Artp</Link></li>
                      </ul>
                    </div>
                    <div className="widget w-recent-posts widget-sidebar">
                      <h4 className="widget-title">JJobs from Envato</h4>
                      <ul>
                        <li><Link href="#">Attached: The Important & Standard Post Format</Link></li>
                        <li><Link href="#">Simple Post Format with Featured Image</Link></li>
                        <li><Link href="#">YouTube Video Post Format</Link></li>
                        <li><Link href="#">SoundCloud Audio Post Format</Link></li>
                        <li><Link href="#">Simple Post Format with Featured Image</Link></li>
                      </ul>
                    </div>
                    <div className="widget w-banner widget-sidebar">
                      <div className="banner-header">Advertising</div>
                      <div className="banner-content">
                        <h4 className="widget-title">Download free Jobbhulp App for your mobile</h4>
                        <div className="icon-market-wrap">
                          <Link href="#"><i className="puzzle-icon fab fa-apple"></i></Link>
                          <Link href="#"><i className="puzzle-icon fab fa-google-play"></i></Link>
                        </div>
                        <img src="/img/iphone1.png" title="phone" />
                      </div>
                    </div>
                    <div className="widget w-recent-comments widget-sidebar">
                      <h4 className="widget-title">Recent Comments</h4>
                      <ul>
                        <li>
                          <i className="puzzle-icon fas fa-comment-alt-dots"></i>
                          <div className="wrapper">
                            <Link href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</Link>
                            <Link href="#" className="author-name">Admin</Link>
                          </div>
                        </li>
                        <li>
                          <i className="puzzle-icon fas fa-comment-alt-dots"></i>
                          <div className="wrapper">
                            <Link href="#">Ut enim ad minpim veniam</Link>
                            <Link href="#" className="author-name">Angelina Johnson</Link>
                          </div>
                        </li>
                        <li>
                          <i className="puzzle-icon fas fa-comment-alt-dots"></i>
                          <div className="wrapper">
                            <Link href="#">Duis aute irure dolor in reprehenderit in voluptate velit esse dolor sit amet</Link>
                            <Link href="#" className="author-name">AdRussell Wrightmin</Link>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="widget widget_links widget-sidebar">
                      <h4 className="widget-title">Archives</h4>
                      <ul>
                        <li><Link href="#">April 2018</Link></li>
                        <li><Link href="#">March 2018</Link></li>
                        <li><Link href="#">February 2018</Link></li>
                        <li><Link href="#">July 2018</Link></li>
                      </ul>
                    </div>
                    <div className="widget w-socials widget-sidebar">
                      <h4 className="widget-title">Social Network</h4>
                      <div className="c-grey">We are awesome follow us:</div>
                      <ul className="socials socials--round socials--colored">
                        <li><Link className="bg-facebook" href="#"><i className="puzzle-icon fab fa-facebook-f"></i></Link></li>
                        <li><Link className="bg-messanger" href="#"><i className="puzzle-icon fab fa-facebook-messenger"></i></Link></li>
                        <li><Link className="bg-twitter" href="#"><i className="puzzle-icon fab fa-twitter"></i></Link></li>
                        <li><Link className="bg-google" href="#"><i className="puzzle-icon fab fa-google-plus-g"></i></Link></li>
                        <li><Link className="bg-rss" href="#"><i className="puzzle-icon far fa-rss"></i></Link></li>
                      </ul>
                    </div>
                    <div className="widget w-tags widget-sidebar">
                      <h4 className="widget-title">Popular Tags</h4>
                      <ul className="tags-list">
                        <li><Link href="#">Startup</Link></li>
                        <li><Link href="#">Business</Link></li>
                        <li><Link href="#">Art</Link></li>
                        <li><Link href="#">Photographyp</Link></li>
                        <li><Link href="#">Creative</Link></li>
                      </ul>
                    </div>
                    <div className="widget w-subscribe widget-sidebar">
                      <h4 className="widget-title">Subscribe to newsletter</h4>
                      <form>
                        <input className="input--white" name="name" placeholder="Email Address" type="email" />
                        <button type="button" className="crumina-button button--dark button--xl w-100">Subscribe Now!</button>
                      </form>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsStandardNewsWithSidebar;