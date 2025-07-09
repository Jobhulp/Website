import React from 'react';
import Link from 'next/link';
import { StaticImageData } from 'next/image';

interface BlogPostVideoProps {
  title: string;
  categories: string[];
  content: string;
  image: StaticImageData;
  date: string;
  comments: number;
  videoUrl: string;
  className?: string;
}

const BlogPostVideo: React.FC<BlogPostVideoProps> = ({
  title,
  categories,
  content,
  image,
  date,
  comments,
  videoUrl,
  className = ''
}) => {
  return (
    <article className={`hentry post post-standard has-post-thumbnail video-youtube ${className}`} data-mh="blog-item">
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
          <img src={image.src} alt="post" />
          <a href={videoUrl} className="video-control video-control-youtube js-popup-iframe">
            <svg className="puzzle-icon" width="12" height="15">
              <path fillRule="evenodd" d="M0 0l12 7-12 8V0z"></path>
            </svg>
          </a>
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

export default BlogPostVideo;