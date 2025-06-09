import React from 'react';
import Link from 'next/link';
import { StaticImageData } from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

interface BlogPostGalleryProps {
  title: string;
  categories: string[];
  content: string;
  images: StaticImageData[];
  date: string;
  comments: number;
  className?: string;
}

const BlogPostGallery: React.FC<BlogPostGalleryProps> = ({
  title,
  categories,
  content,
  images,
  date,
  comments,
  className = ''
}) => {
  return (
    <article className={`hentry post post-standard has-post-thumbnail slider ${className}`} data-mh="blog-item">
      <div className="post-header">
        {categories.map((category, index) => (
          <React.Fragment key={category}>
            <Link href="#" className="post-category">{category}</Link>
            {index < categories.length - 1 && ', '}
          </React.Fragment>
        ))}
      </div>

      <div className="post__content">
        <div className="post-content-wrap">
          <Link href="/news/details" className="post-title h5">
            {title}
          </Link>
          <div className="post-text">
            <p>{content}</p>
          </div>
        </div>

        <div className="post-thumb">
          <div className="crumina-module crumina-module-slider navigation-center-both-sides">
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              navigation={{
                prevEl: '.swiper-btn-prev',
                nextEl: '.swiper-btn-next',
              }}
            >
              <div className="swiper-btn-prev">
                <i className="puzzle-icon fal fa-long-arrow-left" />
              </div>

              <div className="swiper-btn-next">
                <i className="puzzle-icon fal fa-long-arrow-right" />
              </div>

              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image.src} alt={`post ${index + 1}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <div className="post-additional-info">
        <time className="post__date published" dateTime={date}>
          {date}
        </time>

        <Link href="/news/details" className="post__comments">
          {comments}
          <i className="puzzle-icon fas fa-comment-alt-dots" />
        </Link>
      </div>
    </article>
  );
};

export default BlogPostGallery;