import React from 'react';
import Link from 'next/link';

interface BlogPostLinkProps {
  title: string;
  link: string;
  site: string;
  className?: string;
}

const BlogPostLink: React.FC<BlogPostLinkProps> = ({
  title,
  link,
  site,
  className = ''
}) => {
  return (
    <article className={`hentry post post-standard link ${className}`} data-mh="blog-item">
      <div className="post__content">
        <img src="/img/post-link.png" alt="link" />
        <Link href={link} className="post-link">
          <h4 className="post-title entry-title">{title}</h4>
          <div className="site-link">{site}</div>
        </Link>
      </div>
    </article>
  );
};

export default BlogPostLink;