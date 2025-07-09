import React from 'react';

interface BlogPostQuoteProps {
  quote: string;
  author: string;
  role: string;
  className?: string;
}

const BlogPostQuote: React.FC<BlogPostQuoteProps> = ({
  quote,
  author,
  role,
  className = ''
}) => {
  return (
    <article className={`hentry post post-standard has-post-thumbnail quote ${className}`} data-mh="blog-item">
      <div className="post__content">
        <blockquote>
          <p>{quote}</p>
          <h6>
            {author}
            <span>{role}</span>
          </h6>
        </blockquote>
      </div>
    </article>
  );
};

export default BlogPostQuote;