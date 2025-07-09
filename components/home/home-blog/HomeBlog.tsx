import React from 'react';
import post1 from '@/assets/img/post1.jpg';
import post2 from '@/assets/img/post2.jpg';
import { StaticImageData } from 'next/image';

interface BlogPostProps {
	title: string;
	categories: string[];
	content: string;
	image: StaticImageData;
	date: string;
	comments: number;
	isLarge?: boolean;
}

const BlogPost: React.FC<BlogPostProps> = ({
	title,
	categories,
	content,
	image,
	date,
	comments,
	isLarge = false
}) => {
	return (
		<article className={`hentry post post-standard has-post-thumbnail ${isLarge ? 'content-inline' : ''}`} data-mh="blog-item">
			<div className="post-header">
				{categories.map((category, index) => (
					<React.Fragment key={category}>
						<a href="#" className="post-category">{category}</a>
						{index < categories.length - 1 && ', '}
					</React.Fragment>
				))}
			</div>

			<div className="post__content">
				<div className="post-content-wrap">
					<a href="17_news_details_standard.html" className="post-title h5">
						{title}
					</a>
					<div className="post-text">
						<p>{content}</p>
					</div>
				</div>
				<div className="post-thumb">
					<img src={image.src} alt="post" />
				</div>
			</div>

			<div className="post-additional-info">
				<time className="post__date published" dateTime={date}>
					{date}
				</time>

				<a href="17_news_details_standard.html" className="post__comments">
					{comments}
					<i className="puzzle-icon fas fa-comment-alt-dots" />
				</a>
			</div>
		</article>
	);
};

interface BlogHeaderProps {
	title: string;
	description: string;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ title, description }) => {
	return (
		<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb60">
			<header className="crumina-module crumina-heading heading--h2 heading--with-decoration heading--inline mb-0">
				<h2 className="heading-title">{title}</h2>
				<div className="heading-text">{description}</div>
			</header>
		</div>
	);
};

const HomeBlog: React.FC = () => {
	const blogPosts = [
		{
			title: "Attached: The Important & Standard Post Format",
			categories: ["Startup", "Business"],
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolor.",
			image: post1,
			date: "8 December 2018",
			comments: 6,
			isLarge: true
		},
		{
			title: "Simple Post with Featured Image",
			categories: ["Business"],
			content: "Ut enim ad minim aliquip veniam, quis aliquip nostrud aliquip exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
			image: post2,
			date: "26 November 2018",
			comments: 0,
			isLarge: false
		}
	];

	return (
		<section className="medium-padding120">
			<div className="container">
				<div className="row">
					<BlogHeader
						title="Meest recent van de blog"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
					/>
				</div>

				<div className="row mb20">
					<div className="col-lg-8 col-md-6 col-sm-12 col-xs-12">
						<BlogPost {...blogPosts[0]} />
					</div>
					<div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
						<BlogPost {...blogPosts[1]} />
					</div>
				</div>

				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<a href="15_news_grid.html" className="crumina-button button--yellow button--xl load-more-button">All News</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HomeBlog;