import React from 'react';
import Link from 'next/link';

interface BlogPostAudioProps {
  title: string;
  categories: string[];
  content: string;
  date: string;
  comments: number;
  soundcloudUrl: string;
  className?: string;
}

const BlogPostAudio: React.FC<BlogPostAudioProps> = ({
  title,
  categories,
  content,
  date,
  comments,
  soundcloudUrl,
  className = ''
}) => {
  return (
    <article className={`hentry post post-standard has-post-thumbnail audio ${className}`} data-mh="blog-item">
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
          <iframe
            height="200"
            src={soundcloudUrl}
            allow="autoplay"
          ></iframe>
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

export default BlogPostAudio;