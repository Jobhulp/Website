'use client';
import React, { useState, useEffect, useRef } from 'react';
import PageHeader from '../PageHeader';
import CategoryFilter from '../CategoryFilter';
import BlogPost from '../BlogPost';
import BlogPostVideo from '../BlogPostVideo';
import BlogPostQuote from '../BlogPostQuote';
import BlogPostAudio from '../BlogPostAudio';
import BlogPostGallery from '../BlogPostGallery';
import BlogPostLink from '../BlogPostLink';
import post1 from '@/assets/img/post1.jpg';
import post2 from '@/assets/img/post2.jpg';
import post3 from '@/assets/img/post3.jpg';
import post4 from '@/assets/img/post4.jpg';
import post5 from '@/assets/img/post5.jpg';
import post6 from '@/assets/img/post6.jpg';
import { StaticImageData } from 'next/image';

interface BaseBlogPost {
  type: 'standard' | 'video' | 'quote' | 'audio' | 'gallery' | 'link';
}

interface StandardBlogPost extends BaseBlogPost {
  type: 'standard';
  title: string;
  categories: string[];
  content: string;
  image?: StaticImageData;
  date: string;
  comments: number;
  isLarge?: boolean;
}

interface VideoBlogPost extends BaseBlogPost {
  type: 'video';
  title: string;
  categories: string[];
  content: string;
  image: StaticImageData;
  date: string;
  comments: number;
  videoUrl: string;
}

interface QuoteBlogPost extends BaseBlogPost {
  type: 'quote';
  quote: string;
  author: string;
  role: string;
}

interface AudioBlogPost extends BaseBlogPost {
  type: 'audio';
  title: string;
  categories: string[];
  content: string;
  date: string;
  comments: number;
  soundcloudUrl: string;
}

interface GalleryBlogPost extends BaseBlogPost {
  type: 'gallery';
  title: string;
  categories: string[];
  content: string;
  images: StaticImageData[];
  date: string;
  comments: number;
  isLarge?: boolean;
}

interface LinkBlogPost extends BaseBlogPost {
  type: 'link';
  title: string;
  link: string;
  site: string;
}

type BlogPost = StandardBlogPost | VideoBlogPost | QuoteBlogPost | AudioBlogPost | GalleryBlogPost | LinkBlogPost;

const NewsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('*');

  const categories = [
    { label: 'All Articles', value: 'value 1', filter: '*' },
    { label: 'Startup', value: 'value 2', filter: '.startup' },
    { label: 'Business', value: 'value 3', filter: '.business' },
    { label: 'Marketing', value: 'value 4', filter: '.marketing' },
    { label: 'Creative', value: 'value 5', filter: '.creative' },
    { label: 'Photography', value: 'value 5', filter: '.photography' },
    { label: 'Art', value: 'value 5', filter: '.art' }
  ];

  const blogPosts: BlogPost[] = [
    {
      type: 'standard',
      title: "Attached: The Important & Standard Post Format",
      categories: ["Startup", "Business"],
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolor.",
      image: post1,
      date: "8 December 2018",
      comments: 6,
      isLarge: true
    },
    {
      type: 'standard',
      title: "Simple Post with Featured Image",
      categories: ["Business"],
      content: "Ut enim ad minim aliquip veniam, quis aliquip nostrud aliquip exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: post2,
      date: "26 November 2018",
      comments: 0
    },
    {
      type: 'video',
      title: "YouTube Video Post Format",
      categories: ["Marketing"],
      content: "Ut enim ad minim aliquip veniam, quis aliquip nostrud aliquip exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: post3,
      date: "14 November 2018",
      comments: 7,
      videoUrl: "https://www.youtube.com/watch?v=wnJ6LuUFpMo"
    },
    {
      type: 'quote',
      quote: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat velit esse cillum dolore.",
      author: "Angelina Johnson",
      role: "Graphic Designer"
    },
    {
      type: 'audio',
      title: "SoundCloud Audio Post Format",
      categories: ["Creative"],
      content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum sed do eiusmod tempor.",
      date: "30 October 2018",
      comments: 238,
      soundcloudUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/392732244&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
    },
    {
      type: 'link',
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      link: "#",
      site: "crumina.net"
    },
    {
      type: 'gallery',
      title: "Photo Gallery Post Format",
      categories: ["Photography", "Art"],
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolor.",
      images: [post4, post4, post4, post4],
      date: "23 October 2018",
      comments: 6,
      isLarge: true
    },
    {
      type: 'standard',
      title: "Simple Post with Featured Image",
      categories: ["Startup"],
      content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: post5,
      date: "13 September 2018",
      comments: 46
    },
    {
      type: 'video',
      title: "Standard Video Post Format",
      categories: ["Creative"],
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: post6,
      date: "22 August 2018",
      comments: 2,
      videoUrl: "https://www.youtube.com/watch?v=wnJ6LuUFpMo"
    },
    {
      type: 'standard',
      title: "Simple Post without Featured Image",
      categories: ["Business"],
      content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      date: "7 August 2018",
      comments: 0
    }
  ];

  const renderBlogPost = (post: BlogPost) => {
    switch (post.type) {
      case 'video':
        return <BlogPostVideo {...post} />;
      case 'quote':
        return <BlogPostQuote {...post} />;
      case 'audio':
        return <BlogPostAudio {...post} />;
      case 'gallery':
        return <BlogPostGallery {...post} />;
      case 'link':
        return <BlogPostLink {...post} />;
      default:
        return <BlogPost {...post} />;
    }
  };

  // Custom hook for equal height
  function useEqualHeight(className: string) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!ref.current) return;
      const children = ref.current.querySelectorAll<HTMLElement>(className);
      let maxHeight = 0;
      children.forEach(child => {
        child.style.height = 'auto';
        if (child.offsetHeight > maxHeight) maxHeight = child.offsetHeight;
      });
      children.forEach(child => {
        child.style.height = maxHeight + 'px';
      });
    }, [ref.current, className, blogPosts.length]);

    return ref;
  }

  const equalHeightRef = useEqualHeight('.hentry.post');

  return (
    <div className="main-content-wrapper">
      <PageHeader
        title="Read our blog"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'News' }
        ]}
        showSearch
      />

      <section className="sorting-section-js">
        <div className="container">
          <div className="row medium-padding40">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>
          </div>
        </div>

        <div className="container-fluid bg-light-grey">
          <div className="row medium-padding120">
            <div className="container">
              <div
                className="row sorting-container mb20"
                data-layout="fitRows"
                ref={equalHeightRef}
              >
                {blogPosts.map((post, index) => (
                  <div key={index} className={`col-lg-${post.type === 'standard' && (post as StandardBlogPost).isLarge || post.type === 'gallery' && (post as GalleryBlogPost).isLarge ? '8' : '4'} col-md-6 col-sm-12 col-xs-12`}>
                    {renderBlogPost(post)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;