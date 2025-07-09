import React from 'react';
import Link from 'next/link';
import { StaticImageData } from 'next/image';

interface BlogPostProps {
  title: string;
  categories: string[];
  content: string;
  image?: StaticImageData;
  date: string;
  comments: number;
  isLarge?: boolean;
  className?: string;
}

const BlogPost: React.FC<BlogPostProps> = ({
  title,
  categories,
  content,
  image,
  date,
  comments,
  isLarge = false,
  className = ''
}) => {
  return (
    <article className={`hentry post post-standard ${image ? 'has-post-thumbnail' : ''} ${isLarge ? 'content-inline' : ''} ${className}`} data-mh="blog-item">
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
        {image && (
          <div className="post-thumb">
            <img src={image.src} alt="post" />
          </div>
        )}
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

export default BlogPost;